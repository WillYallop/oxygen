import { Request, Response } from 'express';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import C from 'oxygen-constants';
import * as core from 'express-serve-static-core';
import { Library } from '@prisma/client';
import {
    generateErrorString,
    parseErrorString,
} from '../../../../../utils/error-handler';
import db from '../../../../../utils/prisma-client';

// * Description
/*  
    Get single library doc
*/

export interface Params extends core.ParamsDictionary {
    id: Library['id'];
}

const getSingle = async (
    req: Request<Params>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // response
        const response: Res_JSONBody = {
            links: {
                self: `${C.API_DOMAIN}/v1/dev/library/${req.params.id}`,
            },
            data: [],
        };

        // check if the library exists
        const libExists = await db.library.findFirst({
            where: {
                id: {
                    equals: req.params.id,
                },
                developer_id: {
                    equals: req.auth?.id,
                },
            },
        });
        if (!libExists) {
            throw new Error(
                generateErrorString({
                    status: 404,
                    source: 'id',
                    title: 'Library Doc Doesnt Exist',
                    detail: `A library doc with an ID of "${req.params.id}" cannt be found!`,
                }),
            );
        }

        // get
        const libraryRes = await db.library.findUnique({
            where: {
                id: req.params.id,
            },
        });

        if (libraryRes) {
            // add to response
            response.data.push({
                id: libraryRes.id,
                type: 'library',
                attributes: {
                    id: libraryRes.id,
                    type: libraryRes.type,
                    deactivated: libraryRes.deactivated,
                    verified: libraryRes.verified,
                    developerId: libraryRes.developer_id,
                    created: libraryRes.created,
                    modified: libraryRes.modified,
                    name: libraryRes.name,
                    description: libraryRes.description,
                    tags: libraryRes.tags,
                    public: libraryRes.public,
                    free: libraryRes.free,
                    price: libraryRes.price,
                    currencyCode: libraryRes.currency_code,
                },
            });

            // success response
            res.status(200).json(response);
        } else {
            throw new Error(
                generateErrorString({
                    status: 404,
                    source: 'id',
                    title: 'Library Doesnt Exist',
                    detail: `A library doc with an ID of "${req.params.id}" cannt be found!`,
                }),
            );
        }
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        res.status(error.status).json({
            errors: [error],
        });
    }
};

export default getSingle;
