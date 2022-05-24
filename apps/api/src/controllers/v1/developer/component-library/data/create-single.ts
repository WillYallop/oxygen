import { Request, Response } from 'express';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import C from 'oxygen-constants';
import niv, { Validator } from 'node-input-validator';
import {
    generateErrorString,
    parseErrorString,
    resNodeInputValidatorError,
} from '../../../../../utils/error-handler';

// * Description
/*  
    Create a new un-verified component library entry for developers.
*/

interface CreateSingleBody {}

const createSingle = async (
    req: Request<CreateSingleBody>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // validate body config
        const v = new Validator(req.body, {
            username: 'required',
            email: 'required',
            password: 'required',
        });

        // if valid
        const passed = await v.check();

        if (passed) {
            // response
            const response: Res_JSONBody = {
                links: {
                    self: `${C.API_DOMAIN}/v1/dev/library/component`,
                },
                data: [],
            };
        } else resNodeInputValidatorError(v.errors, res);
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        res.status(error.status).json({
            errors: [error],
        });
    }
};

export default createSingle;
