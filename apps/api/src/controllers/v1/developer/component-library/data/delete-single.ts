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
    Delete a single component listing - this doenst actually remove the item from people stores if they have installed it.
    It will just hide it from the component library to stop more installs - it will also remove it from the developers account.
*/

const deleteSingle = async (req: Request, res: Response<Res_ExpressError>) => {
    try {
        // validate body config
        const v = new Validator(req.body, {});

        // if valid
        const passed = await v.check();

        if (passed) {
            // response
            const response: Res_JSONBody = {
                links: {
                    self: `${C.API_DOMAIN}/v1/dev/library/component/${1}`,
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

export default deleteSingle;
