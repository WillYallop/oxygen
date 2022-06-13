import { useEffect, useState } from 'react';
import { Link, useActionData } from '@remix-run/react';
import { Input, InputWrapper } from 'ui';
import { ActionFunction } from '@remix-run/node';
import validateForm from '../../util/validate-form';

export const action: ActionFunction = async ({ request }) => {
    const data = Object.fromEntries(await request.formData());

    return { data };
};

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('hello@williamyallop.com');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const validate = (e: React.FormEvent) => {
        validateForm({
            e: e,
            onValidatePass: fields => {
                console.log(fields);
            },
        });
    };

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
    const emailInp = (
        <Input
            id={'emailInp'}
            name={'email'}
            type={'email'}
            value={email}
            updateValue={val => setEmail(val)}
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
    const passwordRepeatInp = (
        <Input
            id={'passwordRepeatInp'}
            name={'passwordRepeat'}
            type={'password'}
            value={passwordRepeat}
            updateValue={val => setPasswordRepeat(val)}
            required={true}
        />
    );

    return (
        <section className="auth-layout__child">
            <header className="auth-layout__child__header">
                <h1>Welcome to Oxygen</h1>
                <p className="l--bm-t-s">
                    Before we get started. Please create an account!
                </p>
            </header>

            <form className="l--bm-t-l" onSubmit={validate} noValidate={true}>
                <InputWrapper
                    id={usernameInp.props.id}
                    label="Username *"
                    error="There is an issue with this username!"
                    input={usernameInp}
                />
                <InputWrapper
                    id={emailInp.props.id}
                    label="Email Address *"
                    error="Please enter a valid email address!"
                    input={emailInp}
                />
                <InputWrapper
                    id={passwordInp.props.id}
                    label="Passowrd *"
                    error="Please enter a valid password!"
                    input={passwordInp}
                />
                <InputWrapper
                    id={passwordRepeatInp.props.id}
                    label="Password Repeat *"
                    error="Make sure this matches your password field!"
                    input={passwordRepeatInp}
                />

                <input
                    className="btn-style__main l--bm-t-m"
                    type="submit"
                    value="Continue"
                />
            </form>
            <footer className="l--bm-t-l">
                <Link
                    prefetch="intent"
                    to={'/signin'}
                    className="link-style__inline "
                >
                    Have an account already?
                </Link>
            </footer>
        </section>
    );
};

export default Register;
