import { Request, Response } from 'express';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import C from 'oxygen-constants';
import * as core from 'express-serve-static-core';
import { ComponentLibrary } from '@prisma/client';
import { parseErrorString } from '../../../../../utils/error-handler';
import db from '../../../../../utils/prisma-client';

// * Description
/*  
    Get multiple component library docs. Only has basic filtering for created field.
*/

export interface Params extends core.ParamsDictionary {
    cursor: ComponentLibrary['id'] | 'start';
    take: string;
    order: 'asc' | 'desc';
}

const getMultiple = async (
    req: Request<Params>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // response
        const response: Res_JSONBody = {
            links: {
                self: `${C.API_DOMAIN}/v1/dev/library/component/${req.params.cursor}/${req.params.take}/${req.params.order}`,
            },
            data: [],
        };

        const cursorQueryObj = {
            id: req.params.cursor,
        };

        // get multiple
        const results = await db.componentLibrary.findMany({
            take: parseInt(req.params.take, 10),
            cursor: req.params.cursor === 'start' ? undefined : cursorQueryObj,
            where: {
                developer_id: {
                    equals: req.auth?.id,
                },
            },
            orderBy: {
                created: req.params.order,
            },
        });

        for (let i = 0; i < results.length; i += 1) {
            const item = results[i];
            // add to response
            response.data.push({
                id: item.id,
                type: 'componentLibrary',
                attributes: {
                    id: item.id,
                    deactivated: item.deactivated,
                    verified: item.verified,
                    developerId: item.developer_id,
                    created: item.created,
                    modified: item.modified,
                    name: item.name,
                    description: item.description,
                    tags: item.tags,
                    public: item.public,
                    free: item.free,
                    price: item.price,
                    currencyCode: item.currency_code,
                },
            });
        }

        // success response
        res.status(200).json(response);
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        res.status(error.status).json({
            errors: [error],
        });
    }
};

export default getMultiple;
