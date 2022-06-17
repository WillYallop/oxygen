import C from 'oxygen-constants';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import { Validator } from 'node-input-validator';
import {
    generateErrorString,
    parseErrorString,
    resNodeInputValidatorError,
} from '../../../../../utils/error-handler';
import db from '../../../../../utils/prisma-client';
import generateTokenRes from './helper/generate-token';

// * Description
/*  
    Sign in both developer users and standard users - frontend is responsible for redirect location on status 200
*/

export interface Body {
    usernameOrEmail: User['username'] | User['email'];
    password: User['password'];
}

const signIn = async (req: Request<Body>, res: Response<Res_ExpressError>) => {
    try {
        // validate body config
        const v = new Validator(req.body, {
            usernameOrEmail: 'required',
            password: 'required',
        });

        // if valid
        const passed = await v.check();

        if (passed) {
            // response
            const response: Res_JSONBody = {
                links: {
                    self: `${C.API_DOMAIN}/v1/core/authentication/signin`,
                },
                data: [],
            };

            let userRes: {
                id: User['id'];
                email: User['email'];
                username: User['username'];
                password: User['password'];
            } | null = null;

            //
            const userWithEmail = await db.user.findUnique({
                where: {
                    email: req.body.usernameOrEmail,
                },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    password: true,
                },
            });
            if (userWithEmail) userRes = userWithEmail;

            // find user either via the email or password
            const userWithUsername = await db.user.findUnique({
                where: {
                    username: req.body.usernameOrEmail,
                },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    password: true,
                },
            });
            if (userWithUsername) userRes = userWithUsername;

            if (userRes) {
                // check provided password against password in db
                const comparePass = await bcrypt.compare(
                    req.body.password,
                    userRes.password,
                );
                if (comparePass) {
                    // if check passes
                    // set cookie, then return
                    generateTokenRes(
                        {
                            id: userRes.id,
                            email: userRes.email,
                            username: userRes.username,
                        },
                        res,
                    );
                    res.status(200).json(response);
                } else {
                    // else throw 401
                    throw new Error(
                        generateErrorString({
                            status: 403,
                            source: 'authentication',
                            title: 'Invalid Password',
                            detail: `Make sure you enter the correct password!`,
                        }),
                    );
                }
            } else {
                throw new Error(
                    generateErrorString({
                        status: 404,
                        source: 'authentication',
                        title: 'Cannot Find User',
                        detail: `We cannot find a user with these credentials. Make sure the email/username are correct!`,
                    }),
                );
            }
        } else resNodeInputValidatorError(v.errors, res);
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        res.status(error.status).json({
            errors: [error],
        });
    }
};

export default signIn;
