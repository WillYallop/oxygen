import { Request, Response } from 'express';
import {
    Res_ExpressError,
    D_Library_GetSingleLibraryBody,
    D_Library_GetSingleLibraryRes,
} from 'oxygen-types';
import C from 'oxygen-constants';
import * as core from 'express-serve-static-core';
import { Library } from '@prisma/client';
import getImages from './util/get-images';
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
    library_name: Library['library_name'];
}

const getSingle = async (
    req: Request<Params, any, D_Library_GetSingleLibraryBody>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // response
        const response: D_Library_GetSingleLibraryRes = {
            links: {
                self: `${C.API_DOMAIN}/v1/dev/library/${req.params.library_name}`,
            },
            data: [],
        };

        // get check if the library exists
        const libraryRes = await db.library.findFirst({
            where: {
                library_name: {
                    equals: req.params.library_name,
                },
                developer_id: {
                    equals: req.auth?.id,
                },
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
                    libraryName: libraryRes.library_name,
                    name: libraryRes.name,
                    description: libraryRes.description,
                    tags: libraryRes.tags,
                    public: libraryRes.public,
                    free: libraryRes.free,
                    price: libraryRes.price,
                    currencyCode: libraryRes.currency_code,
                    content: libraryRes.content,
                    images: await getImages(libraryRes.id, 'single'),
                },
            });

            // success response
            res.status(200).json(response);
        } else {
            throw new Error(
                generateErrorString({
                    status: 404,
                    source: 'library_name',
                    title: 'Library Doesnt Exist',
                    detail: `A library doc with a library_name of "${req.params.library_name}" cannt be found!`,
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
