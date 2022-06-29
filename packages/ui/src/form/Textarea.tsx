import * as React from 'react';

export interface TextareaProps {
    id: string;
    name: string;
    value: string;
    updateValue: (e: string) => void;
    disabled?: boolean;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    readOnly?: boolean;
    required?: boolean;
    autoComplete?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
    id,
    name,
    value,
    disabled,
    placeholder,
    minLength,
    maxLength,
    readOnly,
    required,
    updateValue,
    autoComplete,
}) => {
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        updateValue(newValue);
    };

    return (
        <textarea
            className="input__style input__style--t"
            id={id}
            name={name}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            readOnly={readOnly}
            maxLength={maxLength}
            minLength={minLength}
            autoComplete={autoComplete}
            aria-errormessage={`${id}_error`}
            aria-describedby={`i-describe_${id}`}
        ></textarea>
    );
};
