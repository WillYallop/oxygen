import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { v1 as uuidv1 } from 'uuid';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import * as core from 'express-serve-static-core';
import C from 'oxygen-constants';
import niv, { Validator } from 'node-input-validator';
import {
    ComponentLibrary,
    PluginLibrary,
    ComponentVersion,
    PluginVersion,
} from '@prisma/client';
import s3Clients from '../../../../../utils/s3-clients';
import {
    generateErrorString,
    parseErrorString,
    resNodeInputValidatorError,
} from '../../../../../utils/error-handler';
import db from '../../../../../utils/prisma-client';
import { versionTypeCb } from '../../../../../utils/niv-extend-callbacks';

// * Description
/*  
    Create a new repository and version instance in the databse and upload the zip to S3
*/

export interface Params extends core.ParamsDictionary {
    version: ComponentVersion['version'] | PluginVersion['version'];
    type: 'component' | 'plugin';
    library_id: ComponentLibrary['id'] | PluginLibrary['id'];
}

const createSingle = async (
    req: Request<Params>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // extend niv validator
        niv.extend('version_type', versionTypeCb);

        // validate body config
        const v = new Validator(req.params, {
            version: 'required',
            type: 'required|version_type',
            library_id: 'required',
        });

        // if valid
        const passed = await v.check();

        if (passed) {
            // response
            const response: Res_JSONBody = {
                links: {
                    self: `${C.API_DOMAIN}/v1/dev/version/${req.params.version}`,
                },
                data: [],
            };

            // check we have a zip file uploaded
            if (!req.files) {
                throw new Error(
                    generateErrorString({
                        status: 400,
                        source: 'file',
                        title: 'Upload Failed',
                        detail: `Make sure to pass a zip file to upload.`,
                    }),
                );
            }

            const keys: Array<string> = Object.keys(req.files);

            // get the first item in the files object array
            // or if its not an array, get the first object data
            let file: UploadedFile;
            if (Array.isArray(req.files[keys[0]])) {
                const [firstFile] = req.files[keys[0]] as UploadedFile[];
                file = firstFile;
            } else file = req.files[keys[0]] as UploadedFile;

            if (!file) {
                throw new Error(
                    generateErrorString({
                        status: 400,
                        source: 'file',
                        title: 'Upload Failed',
                        detail: `Make sure to pass a zip file to upload.`,
                    }),
                );
            }

            if (file.mimetype !== 'application/zip') {
                throw new Error(
                    generateErrorString({
                        status: 400,
                        source: 'file',
                        title: 'Upload Failed',
                        detail: `Make sure you upload a ZIP file!`,
                    }),
                );
            }

            // upload to S3
            const key = uuidv1();
            const params = {
                Bucket: process.env.AWS_S3_VERSIONS_BUCKET_NAME as string,
                Key: key,
                Body: file,
                ContentType: 'application/zip',
                ACL: 'authenticated-read',
            };

            s3Clients.versions.upload(params, (err: Error) => {
                if (err) {
                    throw err;
                }
            });

            // if successfull create a new version instance
            let versionRes: ComponentVersion | PluginVersion;
            if (req.params.type === 'component') {
                versionRes = await db.componentVersion.create({
                    data: {
                        key,
                        version: req.params.version,
                        library_id: req.params.library_id,
                    },
                });
                // response
                response.data.push({
                    id: versionRes.id,
                    type: 'componentVersion',
                    attributes: {
                        id: versionRes.id,
                        key: versionRes.key,
                        version: versionRes.version,
                        created: versionRes.created,
                        libraryId: versionRes.library_id,
                    },
                });
            } else if (req.params.type === 'plugin') {
                versionRes = await db.pluginVersion.create({
                    data: {
                        key,
                        version: req.params.version,
                        library_id: req.params.library_id,
                    },
                });
                // response
                response.data.push({
                    id: versionRes.id,
                    type: 'pluginVersion',
                    attributes: {
                        id: versionRes.id,
                        key: versionRes.key,
                        version: versionRes.version,
                        created: versionRes.created,
                        libraryId: versionRes.library_id,
                    },
                });
            }
            res.json(response);
        } else resNodeInputValidatorError(v.errors, res);
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        res.status(error.status).json({
            errors: [error],
        });
    }
};

export default createSingle;
