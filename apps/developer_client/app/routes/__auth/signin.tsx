import { useState } from 'react';
import { Link } from '@remix-run/react';
import { ActionFunction, redirect } from '@remix-run/node';
import axiosWrapper from '../../util/axios-wrapper';
import { C_Auth_SignInRes, C_Auth_SignInBody } from 'oxygen-types';
// Components
import { Input, InputWrapper } from 'ui';
import FormWrapper from '~/components/Form/FormWrapper';

export const action: ActionFunction = async ({ request }) => {
    const data = Object.fromEntries(await request.formData());

    const postData: C_Auth_SignInBody = {
        usernameOrEmail: data.usernameOrEmail as string,
        password: data.password as string,
    };

    const res = await axiosWrapper<C_Auth_SignInRes, C_Auth_SignInBody>({
        path: '/v1/core/authentication/signin',
        method: 'post',
        body: postData,
        formData: data,
    });

    if (res.success) {
        const setCookies = res.response?.headers['set-cookie'];
        const headers = new Headers();
        if (setCookies) {
            for (let i = 0; i < setCookies.length; i++) {
                headers.append('Set-Cookie', setCookies[i]);
            }
        }
        return redirect('/', {
            headers,
        });
    }

    return res;
};

const SignIn = () => {
    const [usernameEmail, setUsernameEmail] = useState('');
    const [password, setPassword] = useState('');

    // Inputs
    const usernameEmailInp = (
        <Input
            id={'usernameEmailInp'}
            name={'usernameOrEmail'}
            type={'text'}
            value={usernameEmail}
            updateValue={val => setUsernameEmail(val)}
            required={true}
        />
    );
    const passwordInp = (
        <Input
            id={'passwordInp'}
            name={'password'}
            type={'password'}
            value={password}
            updateValue={val => setPassword(val)}
            required={true}
        />
    );

    // Form body
    const FormBody = (
        <>
            <InputWrapper
                id={usernameEmailInp.props.id}
                label="Username / Email"
                error="There is an issue with this username!"
                input={usernameEmailInp}
            />
            <InputWrapper
                id={passwordInp.props.id}
                label="Password"
                error="Please enter a valid password!"
                input={passwordInp}
            />
        </>
    );

    return (
        <section className="auth-layout__child">
            <header className="auth-layout__child__header">
                <h1>Hello again!</h1>
                <p className="l--bm-t-s">
                    Sign back into your Oxygen developer account.
                </p>
            </header>

            <FormWrapper
                inner={FormBody}
                action={''}
                method={'post'}
                submitText={'Sign in'}
            />

            <footer className="l--bm-t-m">
                <Link
                    prefetch="intent"
                    to={'/register'}
                    className="link-style__inline "
                >
                    Don't have an account?
                </Link>
            </footer>
        </section>
    );
};

export default SignIn;
