interface FormValidationHandlerProps {
    e: React.FormEvent;
    customValidation?: CustomValidation;
    onValidatePass: (res: FormSuccessRes) => any;
    onValidateFail?: () => any;
}
export type CustomValidation = Array<{
    field_name: string;
    validator: (value: string) => string;
}>;
export interface FormSuccessRes {
    [key: string]: string;
}

const validateForm = (prop: FormValidationHandlerProps) => {
    prop.e.preventDefault();

    const form = prop.e.target as HTMLFormElement;
    const field = Array.from(form.elements) as Array<HTMLFormElement>;

    // Reset fields
    field.forEach(i => {
        i.setCustomValidity('');
        document
            .getElementById(`i-wrapper_${i.id}`)
            ?.classList.remove('input__wrapper--error');
    });

    // Add custom validators
    if (prop.customValidation) {
        prop.customValidation.forEach(conf => {
            if (form[conf.field_name]) {
                let err = conf.validator(form[conf.field_name].value);
                form[conf.field_name].setCustomValidity(err);
            }
        });
    }

    if (!form.checkValidity()) {
        //Check fields for fail
        field.forEach(i => {
            if (!i.checkValidity())
                document
                    .getElementById(`i-wrapper_${i.id}`)
                    ?.classList.add('input__wrapper--error');
        });
        if (prop.onValidateFail) prop.onValidateFail();
    } else {
        let successRes: FormSuccessRes = {};
        field.forEach(ele => {
            if (ele.name) {
                successRes[ele.name] = ele.value;
            }
        });
        prop.onValidatePass(successRes);
    }
};

export default validateForm;
