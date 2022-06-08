import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { parseErrorString } from '../../../../../utils/error-handler';
import getMediaStream from './util/get-media-stream';

// * Description
/*  
    Steam media files
    TODO - add check to see if the image key exists in the db
*/

export interface Params extends core.ParamsDictionary {
    key: string;
}

const streamMedia = async (req: Request<Params, any, Body>, res: Response) => {
    try {
        const mediaStream = getMediaStream(req.params.key);
        mediaStream.pipe(res);
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        res.status(error.status).json({
            errors: [error],
        });
    }
};

export default streamMedia;
