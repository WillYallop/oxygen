import { NextFunction, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { generateErrorString, parseErrorString } from '../utils/error-handler';

// Check auth
export default async (req: any, res: Response, next: NextFunction) => {
    // Then try standard auth check
    try {
        const token = req.signedCookies['authCookie'];
        if (token != undefined) {
            const decoded = jsonwebtoken.verify(
                token,
                process.env.SECRET_KEY as string,
            );
            req.authentication = {
                authorised: true,
                data: decoded,
            };
            return next();
        } else {
            throw new Error(
                generateErrorString({
                    status: 401,
                    source: 'auth',
                    title: 'Auth Failed',
                    detail: `Auth failed, please make a request with a valid token!`,
                }),
            );
        }
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        return res.status(error.status).json({
            errors: [error],
        });
    }
};
