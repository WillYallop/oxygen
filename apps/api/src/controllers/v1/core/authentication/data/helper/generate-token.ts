import { User } from '@prisma/client';
import jsonwebtoken from 'jsonwebtoken';
import { Response } from 'express';

interface GenerateTokenInterface {
    id: User['id'];
    username: User['username'];
}

export const getToken = (data: GenerateTokenInterface) => {
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
    return token;
};

const generateTokenRes = (data: GenerateTokenInterface, res: Response) => {
    const token = getToken(data);

    const maxAge = 86400000 * 7;

    res.cookie('authCookie', token, {
        maxAge,
        httpOnly: true,
        signed: true,
    });
    // signed in state cookie
    res.cookie('signedIn', true, {
        maxAge,
        httpOnly: false,
        signed: false,
    });
    res.cookie('userID', data.id, {
        maxAge,
        httpOnly: false,
        signed: false,
    });
};
export default generateTokenRes;
