import { Request, Response } from 'express';
import {
    D_Library_CreateLibraryBody,
    D_Library_CreateLibraryRes,
    Res_ExpressError,
} from 'oxygen-types';
import C from 'oxygen-constants';
import * as core from 'express-serve-static-core';
import niv, { Validator } from 'node-input-validator';
import {
    generateErrorString,
    parseErrorString,
    resNodeInputValidatorError,
} from '../../../../../utils/error-handler';
import {
    libraryTypeCb,
    libraryNameCb,
} from '../../../../../utils/niv-extend-callbacks';
import db from '../../../../../utils/prisma-client';

// * Description
/*  
    Create a new un-verified library entry for developers.
*/

export interface Params extends core.ParamsDictionary {
    type: 'component' | 'plugin' | 'kit';
}

const createSingle = async (
    req: Request<Params, any, D_Library_CreateLibraryBody>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // extend niv validator
        niv.extend('type_check', libraryTypeCb);
        niv.extend('library_name', libraryNameCb);

        // validate body config
        const v = new Validator(
            { ...req.body, ...req.params },
            {
                libraryName: 'required|library_name',
                type: 'required|type_check',
                displayName: 'required|string',
                description: 'required|string',
                tags: 'required|array',
                'tags.**': 'string',
                public: 'required|boolean',
                free: 'required|boolean',
                price: 'required|integer',
                content: 'string',
            },
        );

        // if valid
        const passed = await v.check();

        if (passed) {
            // response
            const response: D_Library_CreateLibraryRes = {
                links: {
                    self: `${C.API_DOMAIN}/v1/dev/library/${req.params.type}`,
                },
                data: [],
            };

            // check for exisiting library with this name
            const checkUnique = await db.library.findFirst({
                where: {
                    library_name: {
                        equals: req.body.libraryName,
                    },
                    type: {
                        equals: req.params.type,
                    },
                },
            });
            if (checkUnique) {
                throw new Error(
                    generateErrorString({
                        status: 409,
                        source: 'library_name',
                        title: 'Library Exists',
                        detail: `A library doc with a Library Name of "${req.body.libraryName}" already exists!`,
                    }),
                );
            }

            if (req.auth?.id) {
                const libraryRes = await db.library.create({
                    data: {
                        developer_id: req.auth.id,
                        type: req.params.type,
                        verified: false,
                        library_name: req.body.libraryName,
                        display_name: req.body.displayName,
                        description: req.body.description,
                        tags: req.body.tags || [],
                        public: req.body.public,
                        free: req.body.free,
                        price: req.body.price,
                        content: req.body.content || '',
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
                        libraryName: libraryRes.library_name,
                        displayName: libraryRes.display_name,
                        description: libraryRes.description,
                        tags: libraryRes.tags,
                        public: libraryRes.public,
                        free: libraryRes.free,
                        price: libraryRes.price,
                        currencyCode: libraryRes.currency_code,
                        content: libraryRes.content,
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
