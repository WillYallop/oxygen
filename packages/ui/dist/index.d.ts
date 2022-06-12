import * as React from 'react';

declare const Button: () => JSX.Element;

interface LogoProps {
    size: 'small' | 'medium' | 'large';
}
declare const Logo: React.FC<LogoProps>;

interface InputProps {
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
declare const Input: React.FC<InputProps>;

interface FieldWrapperProps {
    id: string;
    input: React.ReactElement;
    error: string;
    label?: string;
}
declare const FieldWrapper: React.FC<FieldWrapperProps>;

export { Button, FieldWrapper, Input, InputProps, Logo };
