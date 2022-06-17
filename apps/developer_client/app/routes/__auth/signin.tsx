import { useState } from 'react';
import { Link } from '@remix-run/react';
import { ActionFunction, redirect } from '@remix-run/node';
import { CustomValidation } from '../../util/form-valid';
import axiosWrapper from '../../util/axios-wrapper';
import { C_Auth_RegisterUserRes } from 'oxygen-types';
// Components
import { Input, InputWrapper } from 'ui';
import FormWrapper from '~/components/Form/FormWrapper';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Inputs
    const usernameInp = (
        <Input
            id={'usernameInp'}
            name={'username'}
            type={'text'}
            value={username}
            updateValue={val => setUsername(val)}
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
                id={usernameInp.props.id}
                label="Username / Email"
                error="There is an issue with this username!"
                input={usernameInp}
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
