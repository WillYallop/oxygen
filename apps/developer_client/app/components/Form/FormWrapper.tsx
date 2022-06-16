import { useState } from 'react';
import { FormError } from 'ui';
import { Form, useActionData } from '@remix-run/react';
import formIsValid, { CustomValidation } from '../../util/form-valid';
import { AxiosWrapperRes } from 'oxygen-types';

interface FormWrapperProps {
    inner: React.ReactElement;
    action: string;
    submitText: string;
    method: 'post' | 'get';
    customValidation?: CustomValidation;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
    inner,
    action,
    method,
    submitText,
    customValidation,
}) => {
    const actionData = useActionData<AxiosWrapperRes>();
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
            className="l--bm-t-l"
            action={action}
            onChange={onChange}
            method={method}
            noValidate={true}
        >
            {inner}
            {errorComp}
            <input
                className="btn-style__main l--bm-t-l"
                type="submit"
                value={submitText}
                disabled={disableForm}
            />
        </Form>
    );
};

export default FormWrapper;
