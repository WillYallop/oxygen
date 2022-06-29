import * as React from 'react';

interface InputWrapperProps {
    id: string;
    input: React.ReactElement;
    error: string;
    label?: string;
    describedBy?: string;
    className?: string;
}

export const InputWrapper: React.FC<InputWrapperProps> = ({
    id,
    input,
    error,
    label,
    describedBy,
    className,
}) => {
    return (
        <div className={`input__wrapper ${className}`} id={`i-wrapper_${id}`}>
            {label ? (
                <label className="input__label" htmlFor={id}>
                    {label}
                </label>
            ) : null}
            {input}
            <a
                href={`#${id}`}
                id={`${id ? id + '_error' : ''}`}
                className="input__error"
            >
                <p>{error}</p>
            </a>
            {describedBy ? (
                <p
                    className="input__describedby"
                    id={`${id ? 'i-describe_' + id : ''}`}
                >
                    {describedBy}
                </p>
            ) : null}
        </div>
    );
};
