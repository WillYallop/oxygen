import { useEffect, useState } from 'react';
import { Link, Form } from '@remix-run/react';
import { AxiosResponse } from 'axios';
import { Input, InputWrapper, FormError } from 'ui';
import { ActionFunction, ErrorBoundaryComponent } from '@remix-run/node';
import validateForm, { CustomValidation } from '../../util/validate-form';
import axiosWrapper from '../../util/axios-wrapper';

export const action: ActionFunction = async ({ request }) => {
    try {
        const data = Object.fromEntries(await request.formData());

        const postData = {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            passwordRepeat: data.passwordRepeat,
        };

        const res: AxiosResponse = await axiosWrapper({
            path: '/v1/core/authentication/register',
            method: 'post',
            body: postData,
        });

        console.log(res);

        return { data };
    } catch (error) {
        throw error;
    }
};

// render method
const renderForm = (error?: Error) => {
    const [disableForm, setDisableForm] = useState(true);

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

    const onChange = (event: React.FormEvent) => {
        // validate form, if valid undisable the form submit button.
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
        setDisableForm(validateForm(event, customValidation));
    };

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
                onChange={onChange}
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

                {errorComp}

                <input
                    className="btn-style__main l--bm-t-l"
                    type="submit"
                    value="Continue"
                    disabled={disableForm}
                />
            </Form>
            <footer className="l--bm-t-m">
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

// error boundary
export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
    return renderForm(error);
};

// standard
const Register = ({}) => {
    return renderForm();
};

export default Register;
