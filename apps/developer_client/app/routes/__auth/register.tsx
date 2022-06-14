import { useEffect, useState } from 'react';
import { Link, Form } from '@remix-run/react';
import { Input, InputWrapper } from 'ui';
import { ActionFunction } from '@remix-run/node';
import validateForm, { CustomValidation } from '../../util/validate-form';

export const action: ActionFunction = async ({ request }) => {
    const data = Object.fromEntries(await request.formData());

    return { data };
};

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const customValidation: CustomValidation = [
        {
            fieldName: 'password',
            validator: value => {
                const regex = new RegExp(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&_-]{8,}$/,
                );
                if (regex.test(value)) return '';
                else return 'Error';
            },
        },
        {
            fieldName: 'passwordRepeat',
            validator: value => {
                const passwordInpEle = document.getElementById(
                    'passwordInp',
                ) as HTMLInputElement;
                if (value === passwordInpEle.value) return '';
                else return 'Your passwords do not match.';
            },
        },
    ];

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

            <Form
                className="l--bm-t-l"
                replace
                onChange={e => validateForm(e, customValidation)}
                method="post"
                noValidate={true}
            >
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
            </Form>
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
