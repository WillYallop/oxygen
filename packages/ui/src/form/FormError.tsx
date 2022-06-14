import * as React from 'react';

export interface FormErrorProps {
    error: Error;
}

export const FormError: React.FC<FormErrorProps> = ({ error }) => {
    return (
        <div className="form__error">
            <p>{error.message}</p>
        </div>
    );
};
