import { Res_Error, Res_ExpressError } from 'oxygen-types';
import { Validator } from 'node-input-validator';
import { Response } from 'express';

// generate an error string from object for use in Error class
export const generateErrorString = (data: Res_Error): string =>
    `oxygen-error:status:${data.status}source:${data.source}title:${data.title}detail:${data.detail}`;

// parse error string as either instance of error or string
export const parseErrorString = (error: Error | string): Promise<Res_Error> =>
    new Promise(resolve => {
        // parse custom error string
        const parseCustom = (err: string) => {
            resolve({
                status:
                    parseInt(err.split('status:')[1].split('source:')[0], 10) ||
                    500,
                source: err.split('source:')[1].split('title:')[0] || '',
                title: err.split('title:')[1].split('detail:')[0] || '',
                detail: err.split('detail:')[1] || '',
            });
        };
        // resolve standard instance of error
        const resolveStandard = (errorInstance: Error) => {
            resolve({
                status: 500,
                source: 'UNKNOWN_SOURCE',
                title: errorInstance.name,
                detail: errorInstance.message,
            });
        };
        if (error instanceof Error) {
            // check if error is one of our custom ones
            if (error.message.includes('oxygen-error:'))
                parseCustom(error.message);
            else resolveStandard(error);
        } else if (error.includes('oxygen-error:')) parseCustom(error);
        else {
            resolveStandard(
                new Error(
                    'parseErrorString function requires custom oxygen string error or an instance of error!',
                ),
            );
        }
    });

// Handle node-input-validator erros
export const resNodeInputValidatorError = (
    errors: Validator['errors'],
    res: Response<Res_ExpressError>,
) => {
    const code = 400;
    const errorResponse: Array<Res_Error> = [];
    Object.keys(errors).forEach(key => {
        errorResponse.push({
            status: code,
            source: `${key}`,
            title: `Request Body Validation Error`,
            detail: errors[key].message,
        });
    });
    res.status(code).json({
        errors: errorResponse,
    });
};
