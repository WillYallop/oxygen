import React from 'react';
import { AxiosWrapperRes } from 'oxygen-types';

export interface FormErrorProps {
    errors: AxiosWrapperRes<any>['errors'];
}

export const FormError: React.FC<FormErrorProps> = ({ errors }) => {
    if (errors) {
        return (
            <div className="form__error l--bm-t-l">
                <p className="form__error__title t--text-white">
                    {errors.length > 1
                        ? 'Oops, you have some errors.'
                        : `Oops, there's an error.`}
                </p>
                <ul className="form__error__body l--bm-t-s">
                    {errors.map((error, index) => {
                        return <li key={index}>{error.detail}</li>;
                    })}
                </ul>
            </div>
        );
    } else return null;
};
