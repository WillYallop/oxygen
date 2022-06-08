import { Validator } from 'node-input-validator';
import {
    generateErrorString,
    parseErrorString,
    resNodeInputValidatorError,
} from '../../../../../utils/error-handler';
import db from '../../../../../utils/prisma-client';

// * Description
/*  
    
*/

export interface Params {}

const deleteSingle = async () => {
    try {
        // validate body config
        const v = new Validator({}, {});

        // if valid
        const passed = await v.check();

        // if (passed) {
        //     // response

        // } else resNodeInputValidatorError(v.errors, res);
    } catch (err) {
        throw err;
    }
};

export default deleteSingle;
