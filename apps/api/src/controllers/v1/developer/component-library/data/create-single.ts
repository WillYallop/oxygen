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
    Create a new un-verified component library entry for developers.
*/

export interface Body {
    name: ComponentLibrary['name'];
    description: ComponentLibrary['description'];
    tags: ComponentLibrary['tags'];
    public: ComponentLibrary['public'];
    free: ComponentLibrary['free'];
    price: ComponentLibrary['price'];
    currencyCode: ComponentLibrary['currency_code']; // currency code (iso 4217)
}

const createSingle = async (
    req: Request<core.ParamsDictionary, any, Body>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // validate body config
        const v = new Validator(req.body, {
            name: 'required|string',
            description: 'required|string',
            tags: 'required|array',
            'tags.**': 'string',
            public: 'required|boolean',
            free: 'required|boolean',
            price: 'required|integer',
            currencyCode: 'required|string',
        });

        // if valid
        const passed = await v.check();

        if (passed) {
            // response
            const response: Res_JSONBody = {
                links: {
                    self: `${C.API_DOMAIN}/v1/dev/library/component`,
                },
                data: [],
            };

            if (req.auth?.id) {
                const createSingleRes = await db.componentLibrary.create({
                    data: {
                        developer_id: req.auth.id,
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
                    id: createSingleRes.id,
                    type: 'componentLibrary',
                    attributes: {
                        id: createSingleRes.id,
                        incId: createSingleRes.inc_id,
                        deactivated: createSingleRes.deactivated,
                        verified: createSingleRes.verified,
                        developerId: createSingleRes.developer_id,
                        created: createSingleRes.created,
                        modified: createSingleRes.modified,
                        name: createSingleRes.name,
                        description: createSingleRes.description,
                        tags: createSingleRes.tags,
                        public: createSingleRes.public,
                        free: createSingleRes.free,
                        price: createSingleRes.price,
                        currencyCode: createSingleRes.currency_code,
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
