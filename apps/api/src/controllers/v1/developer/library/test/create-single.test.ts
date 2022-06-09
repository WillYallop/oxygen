import request from 'supertest';
import db from '../../../../../utils/prisma-client';
import app from '../../../../../app';

describe('Test developer component library create single route', () => {
    const type = 'component';
    // user register body
    const userRegisterBody = {
        username: 'OxygenCMS',
        firstName: 'Oxygen',
        lastName: 'CMS',
        email: 'test@oxygencms.com',
        password: 'password',
        passwordRepeat: 'password',
    };
    // component library data
    const compLibData = {
        name: 'banner',
        description: 'This is a description',
        tags: ['free', 'choice'],
        public: true,
        free: true,
        price: 0,
        currencyCode: 'gb',
    };
    // cookies
    let cookies: Array<string>;

    // create a new user before each test
    // sign in and store cookie headers above
    beforeEach(async () => {
        // create user
        await request(app)
            .post('/v1/core/authentication/register')
            .set('Accept', 'application/json')
            .send(userRegisterBody)
            .expect('Content-Type', /json/);

        // Make request to login
        const loginRes = await request(app)
            .post('/v1/core/authentication/signin')
            .set('Accept', 'application/json')
            .send({
                email: userRegisterBody.email,
                password: userRegisterBody.password,
            })
            .expect('Content-Type', /json/);

        // Get cookies from response
        const { header } = loginRes;
        cookies = header['set-cookie'];
        return true;
    });

    // remove added user
    // reset cookies
    afterEach(async () => {
        cookies = [];
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

    // test successfull post request
    test('successfull POST request', async () => {
        const response = await request(app)
            .post(`/v1/dev/library/${type}`)
            .set('Accept', 'application/json')
            .set('Cookie', [...cookies])
            .send(compLibData)
            .expect('Content-Type', /json/);
        // should receive 200 code
        expect(response.statusCode).toEqual(200);

        // check response body
        expect(response.body.data[0]).toMatchObject({
            attributes: {
                id: response.body.data[0].id,
                type: type,
                verified: false,
                name: compLibData.name,
                deactivated: false,
                description: compLibData.description,
                tags: compLibData.tags,
                public: compLibData.public,
                free: compLibData.free,
                price: compLibData.price,
                currencyCode: compLibData.currencyCode,
            },
        });

        // delete component library
        await db.library.delete({
            where: {
                id: response.body.data[0].id,
            },
        });
    });
});
