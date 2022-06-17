import request from 'supertest';
import db from '../../../../../utils/prisma-client';
import app from '../../../../../app';

describe('Test sign in authentication route', () => {
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

    // test successfull post request with email
    test('successfull POST request with email', async () => {
        const response = await request(app)
            .post('/v1/core/authentication/signin')
            .set('Accept', 'application/json')
            .send({
                usernameOrEmail: userRegisterBody.email,
                password: userRegisterBody.password,
            })
            .expect('Content-Type', /json/);
        // should receive 200 code
        expect(response.statusCode).toEqual(200);
        // check headers have been set
        expect(response.headers['set-cookie']).toEqual(
            expect.arrayContaining([
                expect.stringContaining('authCookie='),
                expect.stringContaining('signedIn='),
                expect.stringContaining('userID'),
            ]),
        );
    });

    // test successfull post request withj username
    test('successfull POST request with username', async () => {
        // with username
        const response = await request(app)
            .post('/v1/core/authentication/signin')
            .set('Accept', 'application/json')
            .send({
                usernameOrEmail: userRegisterBody.username,
                password: userRegisterBody.password,
            })
            .expect('Content-Type', /json/);
        // should receive 200 code
        expect(response.statusCode).toEqual(200);
        // check headers have been set
        expect(response.headers['set-cookie']).toEqual(
            expect.arrayContaining([
                expect.stringContaining('authCookie='),
                expect.stringContaining('signedIn='),
                expect.stringContaining('userID'),
            ]),
        );
    });

    // test invalid body data
    test('bad request, invalid input data', async () => {
        // attempt to sign in user with wrong credentials
        const response = await request(app)
            .post('/v1/core/authentication/signin')
            .set('Accept', 'application/json')
            .send({
                password: userRegisterBody.password,
            })
            .expect('Content-Type', /json/);
        // should receive 401 code
        expect(response.statusCode).toEqual(400);
        // check errors
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ source: 'usernameOrEmail' }),
            ]),
        );
    });

    // test with invalid password
    test('sign in with invalid password', async () => {
        const response = await request(app)
            .post('/v1/core/authentication/signin')
            .set('Accept', 'application/json')
            .send({
                usernameOrEmail: userRegisterBody.email,
                password: '123',
            })
            .expect('Content-Type', /json/);
        // should receive 403 code
        expect(response.statusCode).toEqual(403);
        // check errors
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ title: 'Invalid Password' }),
            ]),
        );
    });

    // test for user than doesnt exist
    test('sign in for user that doesnt exist', async () => {
        const response = await request(app)
            .post('/v1/core/authentication/signin')
            .set('Accept', 'application/json')
            .send({
                usernameOrEmail: 'idontexist@gmail.com',
                password: '123',
            })
            .expect('Content-Type', /json/);
        // should receive 403 code
        expect(response.statusCode).toEqual(404);
        // check errors
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ title: 'Cannot Find User' }),
            ]),
        );
    });
});
