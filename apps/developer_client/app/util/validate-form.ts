export type CustomValidation = Array<{
    fieldName: string;
    validator: (value: string) => string;
}>;

let timeout: ReturnType<typeof setTimeout>;

const validateForm = (
    e: React.FormEvent,
    customValidation?: CustomValidation,
) => {
    e.preventDefault();

    const input = e.target as HTMLFormElement;

    // Reset fields
    input.setCustomValidity('');
    document
        .getElementById(`i-wrapper_${input.id}`)
        ?.classList.remove('input__wrapper--error');

    // Add custom validators
    if (customValidation) {
        customValidation.forEach(conf => {
            if (input.name === conf.fieldName) {
                let err = conf.validator(input.value);
                input.setCustomValidity(err);
            }
        });
    }

    if (!input.checkValidity()) {
        let wrapperEle = document.getElementById(`i-wrapper_${input.id}`);
        const errorEle = input.nextSibling as HTMLElement;
        if (wrapperEle && errorEle) {
            wrapperEle.classList.add('input__wrapper--error');
            let p = errorEle.querySelector('p') as HTMLElement;
            p.innerText = input.validationMessage;
        }
    }
};

const validateFormHandler = (
    e: React.FormEvent,
    customValidation?: CustomValidation,
) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        validateForm(e, customValidation);
    }, 400);
};

export default validateFormHandler;
