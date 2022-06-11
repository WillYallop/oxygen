import { Request, Response } from 'express';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import C from 'oxygen-constants';
import {
    generateErrorString,
    parseErrorString,
} from '../../../../../utils/error-handler';
import db from '../../../../../utils/prisma-client';

// * Description
/*  
    Get single user
*/

const getCurrent = async (req: Request, res: Response<Res_ExpressError>) => {
    try {
        // response
        const response: Res_JSONBody = {
            links: {
                self: `${C.API_DOMAIN}/v1/core/user/me`,
            },
            data: [],
        };

        // get
        const userRes = await db.user.findUnique({
            where: {
                id: req.auth?.id,
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                username: true,
                email: true,
                country: true,
                locality: true,
                postal_code: true,
                street_address: true,
                premise: true,
                account_created: true,
            },
        });

        if (userRes) {
            // add to response
            response.data.push({
                id: userRes.id,
                type: 'user',
                attributes: {
                    id: userRes.id,
                    firstName: userRes.first_name,
                    lastName: userRes.last_name,
                    username: userRes.username,
                    email: userRes.email,
                    country: userRes.country,
                    locality: userRes.locality,
                    postalCode: userRes.postal_code,
                    streetAddress: userRes.street_address,
                    premise: userRes.premise,
                    accountCreated: userRes.account_created,
                },
            });

            // success response
            res.status(200).json(response);
        } else {
            throw new Error(
                generateErrorString({
                    status: 404,
                    source: 'id',
                    title: 'User Doesnt Exist',
                    detail: `A user doc with an ID of "${req.auth?.id}" cannt be found!`,
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

export default getCurrent;
