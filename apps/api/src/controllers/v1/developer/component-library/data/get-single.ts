import { Request, Response } from 'express';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import C from 'oxygen-constants';
import * as core from 'express-serve-static-core';
import { ComponentLibrary } from '@prisma/client';
import {
    generateErrorString,
    parseErrorString,
} from '../../../../../utils/error-handler';
import db from '../../../../../utils/prisma-client';

// * Description
/*  
    Get single component library doc
*/

export interface Params extends core.ParamsDictionary {
    id: ComponentLibrary['id'];
}

const getSingle = async (
    req: Request<Params>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // response
        const response: Res_JSONBody = {
            links: {
                self: `${C.API_DOMAIN}/v1/dev/library/component/${req.params.id}`,
            },
            data: [],
        };

        // check if the component library exists
        const compExists = await db.componentLibrary.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!compExists) {
            throw new Error(
                generateErrorString({
                    status: 404,
                    source: 'id',
                    title: 'Component Doesnt Exist',
                    detail: `A component library doc with an ID of "${req.params.id}" cannt be found!`,
                }),
            );
        }

        // get
        const getCompRes = await db.componentLibrary.findUnique({
            where: {
                id: req.params.id,
            },
        });

        if (getCompRes) {
            // add to response
            response.data.push({
                id: getCompRes.id,
                type: 'componentLibrary',
                attributes: {
                    id: getCompRes.id,
                    deactivated: getCompRes.deactivated,
                    verified: getCompRes.verified,
                    developerId: getCompRes.developer_id,
                    created: getCompRes.created,
                    modified: getCompRes.modified,
                    name: getCompRes.name,
                    description: getCompRes.description,
                    tags: getCompRes.tags,
                    public: getCompRes.public,
                    free: getCompRes.free,
                    price: getCompRes.price,
                    currencyCode: getCompRes.currency_code,
                },
            });

            // success response
            res.status(200).json(response);
        } else {
            throw new Error(
                generateErrorString({
                    status: 404,
                    source: 'id',
                    title: 'Component Doesnt Exist',
                    detail: `A component library doc with an ID of "${req.params.id}" cannt be found!`,
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
