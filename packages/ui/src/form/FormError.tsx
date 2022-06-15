import React, { useEffect, useState } from 'react';
import { Res_Error } from 'oxygen-types';

export interface FormErrorProps {
    error: Error;
}

export const FormError: React.FC<FormErrorProps> = ({ error }) => {
    const [errors, setErrors] = useState<Array<string>>([]);

    const buildErrors = () => {
        if (error.message.includes('type-custom=')) {
            const msgs = error.message.split('type-custom=')[1];
            const json: Array<Res_Error> = JSON.parse(msgs);
            let errors = [];
            for (let i = 0; i < json.length; i++) {
                errors.push(json[i].detail);
            }
            setErrors(errors);
        } else if (error.message.includes('type-standard=')) {
            const msg = error.message.split('type-standard=')[1];
            setErrors([msg]);
        }
    };

    useEffect(() => {
        buildErrors();
        return () => {
            setErrors([]);
        };
    }, [error]);

    return (
        <div className="form__error l--bm-t-l">
            <p className="form__error__title t--text-white">
                {errors.length > 1
                    ? 'Oops, you have some errors.'
                    : `Oops, there's an error.`}
            </p>
            <ul className="form__error__body l--bm-t-s">
                {errors.map((error, index) => {
                    return <li key={index}>{error}</li>;
                })}
            </ul>
        </div>
    );
};
