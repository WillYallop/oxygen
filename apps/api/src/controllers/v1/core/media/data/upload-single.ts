import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import C from 'oxygen-constants';
import * as core from 'express-serve-static-core';
import { Validator } from 'node-input-validator';
import {
    generateErrorString,
    parseErrorString,
    resNodeInputValidatorError,
} from '../../../../../utils/error-handler';
import processImage from './util/process-image';
import db from '../../../../../utils/prisma-client';

// * Description
/*  
    TODO - Expand to check mim
*/

export interface Body {}

export interface Params extends core.ParamsDictionary {}

const uploadSingle = async (
    req: Request<Params, any, Body>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // check we have a zip file uploaded
        if (!req.files) {
            throw new Error(
                generateErrorString({
                    status: 400,
                    source: 'file',
                    title: 'Upload Failed',
                    detail: `Make sure to pass a valid file to upload.`,
                }),
            );
        }

        const keys: Array<string> = Object.keys(req.files);

        let file: UploadedFile;
        if (Array.isArray(req.files[keys[0]])) {
            const [firstFile] = req.files[keys[0]] as UploadedFile[];
            file = firstFile;
        } else file = req.files[keys[0]] as UploadedFile;

        if (!file) {
            throw new Error(
                generateErrorString({
                    status: 400,
                    source: 'file',
                    title: 'Upload Failed',
                    detail: `Make sure to pass a valid file to upload.`,
                }),
            );
        }

        const images = await processImage({
            input: file.data,
        });

        //@ts-ignore
        res.status(200).json(images);
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        res.status(error.status).json({
            errors: [error],
        });
    }
};

export default uploadSingle;
