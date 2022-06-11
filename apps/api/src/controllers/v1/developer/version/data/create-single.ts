import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { v1 as uuidv1 } from 'uuid';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import * as core from 'express-serve-static-core';
import C from 'oxygen-constants';
import { Validator } from 'node-input-validator';
import { LibraryVersion, Library } from '@prisma/client';
import storeWithS3 from '../../../../../utils/store-with-s3';
import {
    generateErrorString,
    parseErrorString,
    resNodeInputValidatorError,
} from '../../../../../utils/error-handler';
import db from '../../../../../utils/prisma-client';

// * Description
/*  
    Create a new repository and version instance in the databse and upload the zip to S3
*/

export interface Params extends core.ParamsDictionary {
    version: LibraryVersion['version'];
    libraryId: Library['id'];
}

const createSingle = async (
    req: Request<Params>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // validate body config
        const v = new Validator(req.params, {
            version: 'required',
            libraryId: 'required',
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
            const key = `package_${uuidv1()}`;
            const store = await storeWithS3(file.data, key, 'application/zip');

            if (!store.success) {
                throw new Error(
                    generateErrorString({
                        status: 500,
                        source: '',
                        title: 'Unexpected Error',
                        detail: `An unexpected error occurred while uploading your version file!`,
                    }),
                );
            }

            // if successfull create a new version instance
            const versionRes = await db.libraryVersion.create({
                data: {
                    key,
                    version: req.params.version,
                    library_id: req.params.libraryId,
                },
            });
            // response
            response.data.push({
                id: versionRes.id,
                type: 'libraryVersion',
                attributes: {
                    id: versionRes.id,
                    key: versionRes.key,
                    version: versionRes.version,
                    created: versionRes.created,
                    libraryId: versionRes.library_id,
                },
            });
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
