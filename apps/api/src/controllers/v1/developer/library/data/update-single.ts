import { Request, Response } from 'express';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import C from 'oxygen-constants';
import * as core from 'express-serve-static-core';
import { Validator } from 'node-input-validator';
import { Library } from '@prisma/client';
import {
    generateErrorString,
    parseErrorString,
    resNodeInputValidatorError,
} from '../../../../../utils/error-handler';
import db from '../../../../../utils/prisma-client';

// * Description
/*  
    Update a library listing info
*/

export interface Body {
    name?: Library['name'];
    tags?: Library['tags'];
    description?: Library['description'];
    public?: Library['public'];
    free?: Library['free'];
    price?: Library['price'];
    content?: Library['content'];
}

export interface Params extends core.ParamsDictionary {
    id: Library['id'];
}

const updateSingle = async (
    req: Request<Params, any, Body>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // validate body config
        const v = new Validator(
            { ...req.body, ...req.params },
            {
                id: 'required|string',
                name: 'string',
                description: 'string',
                tags: 'array',
                'tags.**': 'string',
                public: 'boolean',
                free: 'boolean',
                price: 'integer|requiredWith:free',
                content: 'string',
            },
        );

        // if valid
        const passed = await v.check();

        if (passed) {
            // response
            const response: Res_JSONBody = {
                links: {
                    self: `${C.API_DOMAIN}/v1/dev/library/${req.params.id}`,
                },
                data: [],
            };

            // check if the component library exists
            const compExists = await db.library.findFirst({
                where: {
                    id: {
                        equals: req.params.id,
                    },
                    developer_id: {
                        equals: req.auth?.id,
                    },
                },
            });
            if (!compExists) {
                throw new Error(
                    generateErrorString({
                        status: 404,
                        source: 'id',
                        title: 'Library Doc Doesnt Exist',
                        detail: `A library doc with an ID of "${req.params.id}" cannt be found!`,
                    }),
                );
            }

            const updateData: Body = {};
            if (req.body.name !== undefined) updateData.name = req.body.name;
            if (req.body.description !== undefined)
                updateData.description = req.body.description;
            if (req.body.tags !== undefined) updateData.tags = req.body.tags;
            if (req.body.public !== undefined)
                updateData.public = req.body.public;
            if (req.body.free !== undefined) updateData.free = req.body.free;
            if (req.body.price !== undefined) updateData.price = req.body.price;
            if (req.body.content !== undefined)
                updateData.content = req.body.content;

            const updateRes = await db.library.update({
                where: {
                    id: req.params.id,
                },
                data: updateData,
            });

            // add to response
            response.data.push({
                id: updateRes.id,
                type: 'library',
                attributes: {
                    id: updateRes.id,
                    type: updateRes.type,
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
                    content: updateRes.content,
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
