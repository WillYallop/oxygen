import { useState } from 'react';
import { FormError } from 'frontend-ui';
import { Form, useActionData, useTransition } from '@remix-run/react';
import formIsValid, { CustomValidation } from '../../util/form-valid';
import { AxiosWrapperRes } from 'oxygen-types';

interface FormWrapperProps {
    inner: React.ReactElement;
    action: string;
    submitText: string;
    submitType?: 'standard' | 'bottom-bar';
    method: 'post' | 'get';
    formIntent?: string;
    customValidation?: CustomValidation;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
    inner,
    action,
    method,
    submitText,
    submitType,
    formIntent,
    customValidation,
}) => {
    const transition = useTransition();
    const actionData = useActionData<AxiosWrapperRes<any>>();

    const [disableForm, setDisableForm] = useState(true);

    let errorComp: React.ReactElement = <></>;
    if (actionData?.errors) {
        errorComp = <FormError errors={actionData.errors} />;
    }

    const onChange = (event: React.FormEvent) => {
        setDisableForm(formIsValid(event, customValidation));
    };

    return (
        <Form
            className={`l--bm-t-l ${
                submitType === 'bottom-bar' ? 'form--with-bottom-bar' : ''
            }`}
            action={action}
            onChange={onChange}
            method={method}
            noValidate={true}
        >
            {inner}
            {errorComp}

            {submitType === 'standard' ? (
                <button
                    className={`btn-style__main l--bm-t-l`}
                    type="submit"
                    name="intent"
                    value={formIntent}
                    disabled={disableForm}
                >
                    {transition.state === 'submitting'
                        ? 'Submitting'
                        : submitText}
                </button>
            ) : (
                /* Submit bar */
                <div className="form__bottom-bar l--sp-th l--bm-t-m l--sp-b">
                    <button
                        className="btn-style__main"
                        type="submit"
                        name="intent"
                        value={formIntent}
                        disabled={disableForm}
                    >
                        Register
                    </button>
                </div>
            )}
        </Form>
    );
};

FormWrapper.defaultProps = {
    submitType: 'standard',
    formIntent: '',
};

export default FormWrapper;
