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
    Deactivate / Activate a single component listing - this doesnt actually remove the item from people stores if they have installed it.
    It will just hide it from the component library to stop more installs - it will also remove it from the developers account.
*/

export interface Params extends core.ParamsDictionary {
    id: ComponentLibrary['id'];
    state: 'true' | 'false';
}

const deactivateSingle = async (
    req: Request<Params>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // response
        const response: Res_JSONBody = {
            links: {
                self: `${C.API_DOMAIN}/v1/dev/library/component/deactivate/${req.params.state}/${req.params.id}`,
            },
            data: [],
        };

        // check state param
        if (req.params.state !== 'false' && req.params.state !== 'true') {
            throw new Error(
                generateErrorString({
                    status: 400,
                    source: 'state',
                    title: 'Incorrect Paramaters',
                    detail: `The state URL paramater must equal "true" or "false". It is set to "${req.params.state}"`,
                }),
            );
        }

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

        // update
        const updateRes = await db.componentLibrary.update({
            where: {
                id: req.params.id,
            },
            data: {
                deactivated: req.params.state === 'true',
            },
        });

        // add to response
        response.data.push({
            id: updateRes.id,
            type: 'componentLibrary',
            attributes: {
                id: updateRes.id,
                deactivated: updateRes.deactivated,
                verified: updateRes.verified,
                developerId: updateRes.developer_id,
                created: updateRes.created,
                modified: updateRes.modified,
                name: updateRes.name,
                description: updateRes.description,
                tags: updateRes.tags,
                public: updateRes.public,
                free: updateRes.free,
                price: updateRes.price,
                currencyCode: updateRes.currency_code,
            },
        });

        // success response
        res.status(200).json(response);
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        res.status(error.status).json({
            errors: [error],
        });
    }
};

export default deactivateSingle;
