import { NextFunction, Response, Request } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { User } from '@prisma/client';
import { generateErrorString, parseErrorString } from '../utils/error-handler';

// Check auth
export default async (req: Request, res: Response, next: NextFunction) => {
    // Then try standard auth check
    try {
        console.log('HERE', req.signedCookies.authCookie);
        const token = req.signedCookies.authCookie;
        if (token !== undefined) {
            const decoded = jsonwebtoken.verify(
                token,
                process.env.SECRET_KEY as string,
            );
            req.auth = decoded as {
                id: User['id'];
                username: User['username'];
            };
            return next();
        }
        throw new Error(
            generateErrorString({
                status: 401,
                source: 'auth',
                title: 'Auth Failed',
                detail: `Auth failed, please make a request with a valid token!`,
            }),
        );
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        return res.status(error.status).json({
            errors: [error],
        });
    }
};
