import * as React from 'react';

interface FieldWrapperProps {
    id: string;
    input: React.ReactElement;
    error: string;
    label?: string;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
    id,
    input,
    error,
    label,
}) => {
    return (
        <div className="field-wrapper" id={`f-wrapper_${id}`}>
            {label ? <label htmlFor={id}>{label}</label> : null}
            {input}
            <div className="field-wrapper__error">
                <p>{error}</p>
            </div>
        </div>
    );
};
