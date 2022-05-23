import C from 'oxygen-constants';
import bcrypt from 'bcrypt';
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
import generateTokenRes from './helper/generate-token';

// * Description
/*  

*/

interface SignInBody {
    username?: User['username'];
    email?: User['email'];
    password: User['password'];
}

const signIn = async (
    req: Request<{}, {}, SignInBody>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // validate body config
        const v = new Validator(req.body, {
            username: 'requiredWithout:email',
            email: 'requiredWithout:username',
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

            const where: {
                email?: User['email'];
                username?: User['username'];
            } = {};
            if (req.body.email) where.email = req.body.email;
            if (req.body.username) where.username = req.body.username;

            // find user either via the email or password
            const user = await db.user.findUnique({
                where: where,
                select: {
                    id: true,
                    email: true,
                    username: true,
                    password: true,
                },
            });
            if (user) {
                // check provided password against password in db
                const comparePass = await bcrypt.compare(
                    req.body.password,
                    user.password,
                );
                if (comparePass) {
                    // if check passes
                    // set cookie, then return
                    generateTokenRes(
                        {
                            id: user.id,
                            email: user.email,
                            username: user.username,
                        },
                        res,
                    );
                    res.status(200).json(response);
                } else {
                    // else throw 401
                    throw new Error(
                        __generateErrorString({
                            status: 401,
                            source: 'authentication',
                            title: 'Invalid Password',
                            detail: `Make sure you enter the correct password!`,
                        }),
                    );
                }
            } else {
                throw new Error(
                    __generateErrorString({
                        status: 404,
                        source: 'authentication',
                        title: 'Cannot Find User',
                        detail: `We cannot find a user with these credentials. Make sure the email/username are correct!`,
                    }),
                );
            }
        } else __resNodeInputValidatorError(v.errors, res);
    } catch (err) {
        const error = await __parseErrorString(err as Error | string);
        res.status(error.status).json({
            errors: [error],
        });
    }
};

export default signIn;
