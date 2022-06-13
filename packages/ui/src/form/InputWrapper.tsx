import * as React from 'react';

interface InputWrapperProps {
    id: string;
    input: React.ReactElement;
    error: string;
    label?: string;
}

export const InputWrapper: React.FC<InputWrapperProps> = ({
    id,
    input,
    error,
    label,
}) => {
    return (
        <div className="input__wrapper" id={`i-wrapper_${id}`}>
            {label ? (
                <label className="input__label" htmlFor={id}>
                    {label}
                </label>
            ) : null}
            {input}
            <div className="input__error">
                <p>{error}</p>
            </div>
        </div>
    );
};
