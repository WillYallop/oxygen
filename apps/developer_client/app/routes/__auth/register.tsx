import { useState } from 'react';
import axios from 'axios';
import { Link, Form } from '@remix-run/react';
import { Input, InputWrapper, FormError } from 'ui';
import { ActionFunction, ErrorBoundaryComponent, json } from '@remix-run/node';
import validateForm, { CustomValidation } from '../../util/validate-form';

export const action: ActionFunction = async ({ request }) => {
    try {
        const data = Object.fromEntries(await request.formData());
        const res = await axios.post(
            `${process.env.API_DOMAIN}/v1/core/authentication/register`,
            {
                username: data.username,
                firstName: 'William',
                lastName: 'Yallop',
                email: data.email,
                password: data.password,
                passwordRepeat: data.passwordRepeat,
            },
        );
        return { data };
    } catch (error) {
        // @ts-ignore
        throw new Error(JSON.stringify(error.response.data.errors));
    }
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
    return renderForm(error);
};

const renderForm = (error?: Error) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    let errorComp: React.ReactElement = <></>;
    if (error) {
        errorComp = <FormError error={error} />;
    }

    const customValidation: CustomValidation = [
        {
            fieldName: 'password',
            validator: value => {
                if (value.length < 6) {
                    return 'Your password must be 6 or more characters.';
                } else {
                    const regex = new RegExp(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&_-]{6,}$/,
                    );
                    if (regex.test(value)) return '';
                    else
                        return 'Your password must contain letters, one number and one special character: @$!%*#?&_-';
                }
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
    const firstNameInp = (
        <Input
            id={'firstName'}
            name={'firstName'}
            type={'text'}
            value={firstName}
            updateValue={val => setFirstName(val)}
            required={true}
        />
    );
    const lastNameInp = (
        <Input
            id={'lastName'}
            name={'lastName'}
            type={'text'}
            value={lastName}
            updateValue={val => setLastName(val)}
            required={true}
        />
    );
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
                <div className="l__grid l__grid--2c">
                    <InputWrapper
                        id={firstNameInp.props.id}
                        label="First Name *"
                        error="There is an issue with this first name!"
                        input={firstNameInp}
                    />
                    <InputWrapper
                        id={lastNameInp.props.id}
                        label="Last Name *"
                        error="There is an issue with this last name!"
                        input={lastNameInp}
                    />
                </div>

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

                <div className="l--bm-t-l">
                    <InputWrapper
                        id={passwordInp.props.id}
                        label="Password *"
                        error="Please enter a valid password!"
                        input={passwordInp}
                    />
                    <InputWrapper
                        id={passwordRepeatInp.props.id}
                        label="Password Repeat *"
                        error="Make sure this matches your password field!"
                        input={passwordRepeatInp}
                    />
                </div>

                <div className="form__error">{errorComp}</div>

                <input
                    className="btn-style__main l--bm-t-l"
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

const Register = ({}) => {
    return renderForm();
};

export default Register;
