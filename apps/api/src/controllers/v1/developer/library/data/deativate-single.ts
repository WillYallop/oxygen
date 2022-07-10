import { Request, Response } from 'express';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import C from 'oxygen-constants';
import * as core from 'express-serve-static-core';
import { Library } from '@prisma/client';
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
    id: Library['id'];
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
                self: `${C.API_DOMAIN}/v1/dev/library/deactivate/${req.params.state}/${req.params.id}`,
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
                    title: 'Library Doesnt Exist',
                    detail: `A library doc with an ID of "${req.params.id}" cannt be found!`,
                }),
            );
        }

        if (req.auth?.id) {
            // update
            const libraryRes = await db.library.update({
                where: {
                    id: req.params.id,
                },
                data: {
                    deactivated: req.params.state === 'true',
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
                        displayName: libraryRes.display_name,
                        description: libraryRes.description,
                        tags: libraryRes.tags,
                        public: libraryRes.public,
                        free: libraryRes.free,
                        price: libraryRes.price,
                        currencyCode: libraryRes.currency_code,
                    },
                });
            }

            // success response
            res.status(200).json(response);
        }
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        res.status(error.status).json({
            errors: [error],
        });
    }
};

export default deactivateSingle;
