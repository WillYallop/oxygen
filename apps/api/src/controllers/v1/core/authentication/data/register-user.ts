import C from 'oxygen-constants';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import {
    __generateErrorString,
    __parseErrorString,
    __resNodeInputValidatorError,
} from '../../../../../utils/error-handler';
import niv, { Validator } from 'node-input-validator';
import { nameRegexCb } from '../../../../../utils/niv-extend-callbacks';
import db from '../../../../../utils/prisma-client';

// * Description
/*  
    Register a new user - the user model is shared between the developer and cms clients. 
    So if you create an account for one you can use it for the other.
*/

interface RegisterUserBody {
    username: User['username'];
    firstName: User['first_name'];
    lastName: User['last_name'];
    email: User['email'];
    password: User['password'];
    passwordRepeat: User['password'];
}

const registerUser = async (
    req: Request<{}, {}, RegisterUserBody>,
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
            const response: Res_JSONBody = {
                links: {
                    self: `${C.API_DOMAIN}/v1/core/authentication/register`,
                },
                data: [],
            };
            // check if user exists with same email address
            const userExists = await db.user.findUnique({
                where: {
                    email: req.body.email,
                },
                select: {
                    email: true,
                },
            });
            if (userExists) {
                throw new Error(
                    __generateErrorString({
                        status: 409,
                        source: 'email',
                        title: 'User Exists',
                        detail: `A user with the email ${req.body.email} is already registered!`,
                    }),
                );
            }
            // register new user
            else {
                const newUser = await db.user.create({
                    data: {
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        password: req.body.password,
                        email: req.body.email,
                        username: req.body.username,
                        country: '',
                        locality: '',
                        postal_code: '',
                        street_address: '',
                        premise: '',
                        profile_picture: '',
                    },
                });
                // add use to response
                response.data.push({
                    id: newUser.id,
                    type: 'user',
                    attributes: {
                        first_name: newUser.first_name,
                        last_name: newUser.last_name,
                        email: newUser.email,
                        username: newUser.username,
                        country: newUser.country,
                        locality: newUser.locality,
                        postal_code: newUser.postal_code,
                        street_address: newUser.street_address,
                        premise: newUser.premise,
                        profile_picture: newUser.profile_picture,
                    },
                });
                // success response
                res.status(200).json(response);
            }
        } else __resNodeInputValidatorError(v.errors, res);
    } catch (err) {
        res.status(500).json({
            errors: [await __parseErrorString(err as Error | string)],
        });
    }
};

export default registerUser;
