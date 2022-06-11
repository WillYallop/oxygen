import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { v1 as uuidv1 } from 'uuid';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import * as core from 'express-serve-static-core';
import C from 'oxygen-constants';
import niv, { Validator } from 'node-input-validator';
import { LibraryVersion, Library } from '@prisma/client';
import s3Clients from '../../../../../utils/s3-clients';
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
    libraryId: Library['id'];
}

const createSingle = async (
    req: Request<Params>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // validate body config
        const v = new Validator(req.params, {
            libraryId: 'required',
        });

        // if valid
        const passed = await v.check();

        if (passed) {
            // response
            const response: Res_JSONBody = {
                links: {
                    self: `${C.API_DOMAIN}/v1/dev/version/active/${req.params.version}`,
                },
                data: [],
            };

            // if successfull create a new version instance
            const versionRes = await db.libraryVersion.findFirst({
                where: {
                    library_id: req.params.libraryId,
                    active: true,
                },
            });
            if (versionRes) {
                // response
                response.data.push({
                    id: versionRes.id,
                    type: 'libraryVersion',
                    attributes: {
                        id: versionRes.id,
                        version: versionRes.version,
                        key: versionRes.key,
                        created: versionRes.created,
                        library_id: versionRes.library_id,
                        active: versionRes.active,
                    },
                });
            } else {
                throw new Error(
                    generateErrorString({
                        status: 404,
                        source: 'version',
                        title: 'Cannot Find',
                        detail: `We cannot find an active library version!`,
                    }),
                );
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
