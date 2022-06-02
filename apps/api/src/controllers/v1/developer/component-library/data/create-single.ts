import { Request, Response } from 'express';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import C from 'oxygen-constants';
import { Validator } from 'node-input-validator';
import {
    generateErrorString,
    parseErrorString,
    resNodeInputValidatorError,
} from '../../../../../utils/error-handler';
import db from '../../../../../utils/prisma-client';
import { ComponentLibrary } from '@prisma/client';

// * Description
/*  
    Create a new un-verified component library entry for developers.
*/

export interface Body {
    name: ComponentLibrary['name'];
    tags: ComponentLibrary['tags'];
    public: ComponentLibrary['public'];
    free: ComponentLibrary['free'];
    price: ComponentLibrary['price'];
    currencyCode: ComponentLibrary['currency_code']; // currency code (iso 4217)
    versionId: ComponentLibrary['version_id'];
}

const createSingle = async (
    req: Request<Body>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // validate body config
        const v = new Validator(req.body, {
            name: 'required',
            tags: 'array',
            'tags.**': 'string',
            public: 'required',
            free: 'required',
            price: 'required',
            currencyCode: 'required',
            versionId: 'required',
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
                        tags: req.body.tags || [],
                        version_id: req.body.versionId,
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
                        verified: createSingleRes.verified,
                        developer_id: createSingleRes.developer_id,
                        created: createSingleRes.created,
                        modified: createSingleRes.modified,
                        name: createSingleRes.name,
                        tags: createSingleRes.tags,
                        version_id: createSingleRes.version_id,
                        public: createSingleRes.public,
                        free: createSingleRes.free,
                        price: createSingleRes.price,
                        currency_code: createSingleRes.currency_code,
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
