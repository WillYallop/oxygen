import * as React from 'react';

export interface InputProps {
    id: string;
    name: string;
    type: 'text' | 'email' | 'password' | 'url' | 'tel';
    value: string;
    updateValue: (value: string) => void;
    disabled?: boolean;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    readOnly?: boolean;
    required?: boolean;
    autoComplete?: string;
}

export const Input: React.FC<InputProps> = ({
    id,
    name,
    type,
    value,
    disabled,
    placeholder,
    minLength,
    maxLength,
    pattern,
    readOnly,
    required,
    updateValue,
    autoComplete,
}) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        updateValue(newValue);
    };

    return (
        <input
            className="input__style input__style--i"
            id={id}
            name={name}
            type={type}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            readOnly={readOnly}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            autoComplete={autoComplete}
            aria-errormessage={`${id}_error`}
            aria-describedby={`i-describe_${id}`}
        ></input>
    );
};
