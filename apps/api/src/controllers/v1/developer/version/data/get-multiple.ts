import { Request, Response } from 'express';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import C from 'oxygen-constants';
import * as core from 'express-serve-static-core';
import { LibraryVersion, Library } from '@prisma/client';
import { Validator } from 'node-input-validator';
import {
    parseErrorString,
    resNodeInputValidatorError,
} from '../../../../../utils/error-handler';
import db from '../../../../../utils/prisma-client';

// * Description
/*  
    Get multiple library version docs.
*/

export interface Params extends core.ParamsDictionary {
    libraryId: Library['id'];
    cursor: LibraryVersion['id'] | 'start';
    take: string;
}

const getMultiple = async (
    req: Request<Params>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // validate body config
        const v = new Validator(req.params, {
            libraryId: 'required',
            cursor: 'required',
            take: 'required',
        });

        // if valid
        const passed = await v.check();

        if (passed) {
            // response
            const response: Res_JSONBody = {
                links: {
                    self: `${C.API_DOMAIN}/v1/dev/version/${req.params.libraryId}/${req.params.cursor}/${req.params.take}`,
                },
                data: [],
            };

            const cursorQueryObj = {
                id: req.params.cursor,
            };

            // get multiple
            const libResults = await db.libraryVersion.findMany({
                take: parseInt(req.params.take, 10),
                cursor:
                    req.params.cursor === 'start' ? undefined : cursorQueryObj,
                where: {
                    library_id: {
                        equals: req.params.libraryId,
                    },
                },
                orderBy: {
                    created: 'desc',
                },
            });

            for (let i = 0; i < libResults.length; i += 1) {
                response.data.push({
                    id: libResults[i].id,
                    type: 'libraryVersion',
                    attributes: {
                        id: libResults[i].id,
                        version: libResults[i].version,
                        key: libResults[i].key,
                        created: libResults[i].created,
                        library_id: libResults[i].library_id,
                        active: libResults[i].active,
                    },
                });
            }

            // success response
            res.status(200).json(response);
        } else resNodeInputValidatorError(v.errors, res);
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        res.status(error.status).json({
            errors: [error],
        });
    }
};

export default getMultiple;
