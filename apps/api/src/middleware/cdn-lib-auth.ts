import { NextFunction, Response, Request } from 'express';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import C from 'oxygen-constants';
import * as core from 'express-serve-static-core';
import { generateErrorString, parseErrorString } from '../utils/error-handler';
import db from '../utils/prisma-client';

// * Description
/*  
    Only authorise requests for key paramaters that exist in the media table in the db
*/

export interface Params extends core.ParamsDictionary {
    key: string;
}

const cdnLibAuth = async (
    req: Request<Params>,
    res: Response<Res_ExpressError>,
    next: NextFunction,
) => {
    try {
        // the key param includes an axtension so remove it.
        if (req.params.key.includes('media_')) {
            const lookupKey = req.params.key.split('.')[0];
            const lib = await db.libraryMedia.findUnique({
                where: {
                    key: lookupKey,
                },
            });
            if (lib) {
                return next();
            }
        }
        throw new Error(
            generateErrorString({
                status: 404,
                source: 'key',
                title: 'Media Missing',
                detail: `We cannot find a media file with that key!`,
            }),
        );
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        return res.status(error.status).json({
            errors: [error],
        });
    }
};

export default cdnLibAuth;
