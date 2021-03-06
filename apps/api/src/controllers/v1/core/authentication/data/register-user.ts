import C from 'oxygen-constants';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import {
    Res_ExpressError,
    C_Auth_RegisterUserRes,
    C_Auth_RegisterUserBody,
} from 'oxygen-types';
import niv, { Validator } from 'node-input-validator';
import {
    generateErrorString,
    parseErrorString,
    resNodeInputValidatorError,
} from '../../../../../utils/error-handler';
import { nameRegexCb } from '../../../../../utils/niv-extend-callbacks';
import db from '../../../../../utils/prisma-client';
import generateTokenRes from './helper/generate-token';

// * Description
/*  
    Register a new user - the user model is shared between the developer and cms clients. 
    So if you create an account for one you can use it for the other.
*/

const registerUser = async (
    req: Request<C_Auth_RegisterUserBody>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // extend niv validator
        niv.extend('name_regex', nameRegexCb);

        // validate body config
        const v = new Validator(req.body, {
            username: 'required|minLength:2',
            firstName: 'required|name_regex',
            lastName: 'required|name_regex',
            email: 'required|email',
            password: 'required|minLength:6|same:passwordRepeat',
            passwordRepeat: 'required|minLength:6',
        });

        // validate body check
        const passed = await v.check();

        // check if passed or failed
        if (passed) {
            // response
            const response: C_Auth_RegisterUserRes = {
                links: {
                    self: `${C.API_DOMAIN}/v1/core/authentication/register`,
                },
                data: [],
            };

            // check if user exists with same email address
            const userEmailExists = await db.user.findUnique({
                where: {
                    email: req.body.email,
                },
                select: {
                    email: true,
                },
            });
            if (userEmailExists) {
                throw new Error(
                    generateErrorString({
                        status: 409,
                        source: 'email',
                        title: 'User Exists',
                        detail: `A user with the email ${req.body.email} is already registered!`,
                    }),
                );
            }

            // check if user exists with same username
            const userUsernameExists = await db.user.findUnique({
                where: {
                    username: req.body.username,
                },
                select: {
                    username: true,
                },
            });
            if (userUsernameExists) {
                throw new Error(
                    generateErrorString({
                        status: 409,
                        source: 'username',
                        title: 'User Exists',
                        detail: `A user with the username ${req.body.username} is already registered!`,
                    }),
                );
            }

            // register new user
            if (!userEmailExists && !userUsernameExists) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                const newUser = await db.user.create({
                    data: {
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        password: hashedPassword,
                        email: req.body.email,
                        username: req.body.username,
                        country: '',
                        locality: '',
                        postal_code: '',
                        street_address: '',
                        premise: '',
                    },
                });
                // add use to response
                response.data.push({
                    id: newUser.id,
                    type: 'user',
                    attributes: {
                        firstName: newUser.first_name,
                        lastName: newUser.last_name,
                        email: newUser.email,
                        username: newUser.username,
                        country: newUser.country,
                        locality: newUser.locality,
                        postalCode: newUser.postal_code,
                        streetAddress: newUser.street_address,
                        premise: newUser.premise,
                        accountCreated: newUser.account_created,
                    },
                });

                generateTokenRes(
                    {
                        id: newUser.id,
                        email: newUser.email,
                        username: newUser.username,
                    },
                    res,
                );

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

export default registerUser;
