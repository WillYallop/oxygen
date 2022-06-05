import { Request, Response } from 'express';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import C from 'oxygen-constants';
import * as core from 'express-serve-static-core';
import { Validator } from 'node-input-validator';
import { ComponentLibrary } from '@prisma/client';
import {
    generateErrorString,
    parseErrorString,
    resNodeInputValidatorError,
} from '../../../../../utils/error-handler';
import db from '../../../../../utils/prisma-client';
// * Description
/*  
    Update a component library listing info

*/

export interface Body {
    name?: ComponentLibrary['name'];
    tags?: ComponentLibrary['tags'];
    description?: ComponentLibrary['description'];
    public?: ComponentLibrary['public'];
    free?: ComponentLibrary['free'];
    price?: ComponentLibrary['price'];
}

export interface Params extends core.ParamsDictionary {
    id: ComponentLibrary['id'];
}

const updateSingle = async (
    req: Request<Params, any, Body>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // validate body config
        const v = new Validator(req.body, {
            name: 'string',
            description: 'string',
            tags: 'array',
            'tags.**': 'string',
            public: 'boolean',
            free: 'boolean',
            price: 'integer|requiredWith:free',
        });

        // if valid
        const passed = await v.check();

        const updateData: Body = {};
        if (req.body.name) updateData.name = req.body.name;

        if (passed) {
            // response
            const response: Res_JSONBody = {
                links: {
                    self: `${C.API_DOMAIN}/v1/dev/library/component`,
                },
                data: [],
            };

            const updateDate: Body = {};
            if (req.body.name) updateData.name = req.body.name;
            if (req.body.description)
                updateData.description = req.body.description;
            if (req.body.tags) updateData.tags = req.body.tags;
            if (req.body.public) updateData.public = req.body.public;
            if (req.body.free) updateData.free = req.body.free;
            if (req.body.price) updateData.price = req.body.price;

            const updateRes = await db.componentLibrary.update({
                where: {
                    id: req.params.id,
                },
                data: updateDate,
            });

            // add to response
            response.data.push({
                id: updateRes.id,
                type: 'componentLibrary',
                attributes: {
                    id: updateRes.id,
                    verified: updateRes.verified,
                    developer_id: updateRes.developer_id,
                    created: updateRes.created,
                    modified: updateRes.modified,
                    name: updateRes.name,
                    description: updateRes.description,
                    tags: updateRes.tags,
                    public: updateRes.public,
                    free: updateRes.free,
                    price: updateRes.price,
                    currency_code: updateRes.currency_code,
                },
            });

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

export default updateSingle;
