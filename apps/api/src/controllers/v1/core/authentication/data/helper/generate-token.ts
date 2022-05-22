import { User } from '@prisma/client';
import jsonwebtoken from 'jsonwebtoken';
import { Response } from 'express';

interface GenerateTokenInterface {
    id: User['id'];
    username: User['username'];
    email: User['email'];
}

const __generateTokenRes = (data: GenerateTokenInterface, res: Response) => {
    try {
        const tokenData = {
            id: data.id,
            username: data.username,
        };
        const token = jsonwebtoken.sign(
            tokenData,
            process.env.SECRET_KEY as string,
            {
                expiresIn: '7d',
            },
        );

        const maxAge = 86400000 * 7;

        res.cookie('authCookie', token, {
            maxAge: maxAge,
            httpOnly: true,
            signed: true,
        });
        // signed in state cookie
        res.cookie('signedIn', true, {
            maxAge: maxAge,
            httpOnly: false,
            signed: false,
        });
        res.cookie('userID', data.id, {
            maxAge: maxAge,
            httpOnly: false,
            signed: false,
        });
    } catch (err) {
        throw err;
    }
};
export default __generateTokenRes;
