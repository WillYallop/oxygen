import request from 'supertest';
import db from '../../../../../utils/prisma-client';
import app from '../../../../../app';

describe('Test register user authentication route', () => {
    // user register body
    const userRegisterBody = {
        username: 'OxygenCMS',
        firstName: 'Oxygen',
        lastName: 'CMS',
        email: 'test@oxygencms.com',
        password: 'password',
        passwordRepeat: 'password',
    };

    // create a new user before each test
    beforeEach(async () => {
        await request(app)
            .post('/v1/core/authentication/register')
            .set('Accept', 'application/json')
            .send(userRegisterBody)
            .expect('Content-Type', /json/);
        // // should receive 200 code
        // expect(response.statusCode).toEqual(200);
        // // check response body
        // expect(response.body.data[0]).toMatchObject({
        //     attributes: {
        //         username: 'OxygenCMS',
        //         firstName: 'Oxygen',
        //         lastName: 'CMS',
        //         email: 'test@oxygencms.com',
        //     },
        // });
        // // check headers have been set
        // expect(response.headers['set-cookie']).toEqual(
        //     expect.arrayContaining([
        //         expect.stringContaining('authCookie='),
        //         expect.stringContaining('signedIn='),
        //         expect.stringContaining('userID'),
        //     ]),
        // );
        return true;
    });

    // remove added user
    afterEach(async () => {
        const user = await db.user.findUnique({
            where: {
                email: userRegisterBody.email,
            },
        });
        if (user) {
            await db.user.delete({
                where: {
                    email: userRegisterBody.email,
                },
            });
            return true;
        }
        return true;
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

    // username or email address already registered
    test('username or email address already registered', async () => {
        // try and register a user again with the same email, should return 409 with error body
        const response1 = await request(app)
            .post('/v1/core/authentication/register')
            .set('Accept', 'application/json')
            .send({
                username: 'OxygenCMS2',
                firstName: userRegisterBody.firstName,
                lastName: userRegisterBody.lastName,
                email: userRegisterBody.email,
                password: userRegisterBody.password,
                passwordRepeat: userRegisterBody.passwordRepeat,
            })
            .expect('Content-Type', /json/);
        // should receive 409 code
        expect(response1.statusCode).toEqual(409);
        // check for the correct error message
        expect(response1.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ status: 409, source: 'email' }),
            ]),
        );
        // try and register a user again with the same username, should return 409 with error body
        const response2 = await request(app)
            .post('/v1/core/authentication/register')
            .set('Accept', 'application/json')
            .send({
                username: userRegisterBody.username,
                firstName: userRegisterBody.firstName,
                lastName: userRegisterBody.lastName,
                email: 'test3@oxygencms.com',
                password: userRegisterBody.password,
                passwordRepeat: userRegisterBody.passwordRepeat,
            })
            .expect('Content-Type', /json/);
        // should receive 409 code
        expect(response2.statusCode).toEqual(409);
        // check for the correct error message
        expect(response2.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ status: 409, source: 'username' }),
            ]),
        );
    });
});
