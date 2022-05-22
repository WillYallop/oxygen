const request = require('supertest');
import db from '../../../../../utils/prisma-client';
import app from '../../../../../app';

describe('Test register user authentication route', () => {
    // test successfull post request
    test('successfull POST request', async () => {
        const body = {
            username: 'OxygenCMS',
            firstName: 'Oxygen',
            lastName: 'CMS',
            email: 'test@oxygencms.com',
            password: 'password',
            passwordRepeat: 'password',
        };

        const response = await request(app)
            .post('/v1/core/authentication/register')
            .set('Accept', 'application/json')
            .send(body)
            .expect('Content-Type', /json/);

        // should receive 200 code
        expect(response.statusCode).toEqual(200);

        // check response body
        expect(response.body.data[0]).toMatchObject({
            attributes: {
                username: 'OxygenCMS',
                firstName: 'Oxygen',
                lastName: 'CMS',
                email: 'test@oxygencms.com',
            },
        });

        await db.user.delete({
            where: {
                email: body.email,
            },
        });
    });

    // test invalid post request
    test('bad request, invalid input data', async () => {
        const body = {
            username: '',
            firstName: '',
            lastName: '',
            email: 'testoxygencms.com',
            password: 'password',
            passwordRepeat: 'passwdfford',
        };

        const response = await request(app)
            .post('/v1/core/authentication/register')
            .set('Accept', 'application/json')
            .send(body)
            .expect('Content-Type', /json/);

        // should receive 400 code
        expect(response.statusCode).toEqual(400);

        // check errors
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ source: 'username' }),
                expect.objectContaining({ source: 'firstName' }),
                expect.objectContaining({ source: 'lastName' }),
                expect.objectContaining({ source: 'email' }),
                expect.objectContaining({ source: 'password' }),
            ]),
        );
    });
});
