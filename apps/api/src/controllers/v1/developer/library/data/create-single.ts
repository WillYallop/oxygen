import { Request, Response } from 'express';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import C from 'oxygen-constants';
import * as core from 'express-serve-static-core';
import niv, { Validator } from 'node-input-validator';
import { Library } from '@prisma/client';
import {
    parseErrorString,
    resNodeInputValidatorError,
} from '../../../../../utils/error-handler';
import { libraryTypeCb } from '../../../../../utils/niv-extend-callbacks';
import db from '../../../../../utils/prisma-client';

// * Description
/*  
    Create a new un-verified library entry for developers.
*/

export interface Params extends core.ParamsDictionary {
    type: 'component' | 'plugin' | 'kit';
}

export interface Body {
    name: Library['name'];
    description: Library['description'];
    tags: Library['tags'];
    public: Library['public'];
    free: Library['free'];
    price: Library['price'];
    currencyCode: Library['currency_code']; // currency code (iso 4217)
}

const createSingle = async (
    req: Request<Params, any, Body>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // extend niv validator
        niv.extend('type_check', libraryTypeCb);

        // validate body config
        const v = new Validator(
            { ...req.body, ...req.params },
            {
                type: 'required|type_check',
                name: 'required|string',
                description: 'required|string',
                tags: 'required|array',
                'tags.**': 'string',
                public: 'required|boolean',
                free: 'required|boolean',
                price: 'required|integer',
                currencyCode: 'required|string',
            },
        );

        // if valid
        const passed = await v.check();

        if (passed) {
            // response
            const response: Res_JSONBody = {
                links: {
                    self: `${C.API_DOMAIN}/v1/dev/library/${req.params.type}`,
                },
                data: [],
            };

            if (req.auth?.id) {
                const libraryRes = await db.library.create({
                    data: {
                        developer_id: req.auth.id,
                        type: req.params.type,
                        verified: false,
                        name: req.body.name,
                        description: req.body.description,
                        tags: req.body.tags || [],
                        public: req.body.public,
                        free: req.body.free,
                        price: req.body.price,
                        currency_code: req.body.currencyCode,
                    },
                });

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
            }
        } else resNodeInputValidatorError(v.errors, res);
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        res.status(error.status).json({
            errors: [error],
        });
    }
};

export default createSingle;
