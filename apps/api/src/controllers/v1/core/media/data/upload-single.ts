import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { v1 as uuidv1 } from 'uuid';
import mime from 'mime-types';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import * as core from 'express-serve-static-core';
import C from 'oxygen-constants';
import {
    generateErrorString,
    parseErrorString,
} from '../../../../../utils/error-handler';
import processImage from './util/process-image';
import storeMedia from './util/store-media';
import db from '../../../../../utils/prisma-client';

// * Description
/*  
    Upload a single image file
*/

const IMAGE_MIMES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/avif',
    'image/webp',
];
const VALID_MIMBES = {
    internal: [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/avif',
        'image/webp',
    ],
    site: [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/avif',
        'image/webp',
        'image/svg+xml',
        'image/gif',
        'application/pdf',
    ],
};

export interface Body {}

export interface Params extends core.ParamsDictionary {
    mode: 'internal' | 'site';
}

const uploadSingle = async (
    req: Request<Params, any, Body>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // response
        const response: Res_JSONBody = {
            links: {
                self: `${C.API_DOMAIN}/v1/core/media/${req.params.mode}`,
            },
            data: [],
        };

        // vefify files exists and set
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

        let allowedMimes;
        // depending on the mode set the current allowed mimes
        if (req.params.mode === 'internal')
            allowedMimes = VALID_MIMBES.internal;
        else allowedMimes = VALID_MIMBES.site;
        // check uploaded file against allowed mimes
        let findMatchingMime = allowedMimes.find(x => x === file.mimetype);
        if (findMatchingMime === undefined) {
            throw new Error(
                generateErrorString({
                    status: 400,
                    source: 'file',
                    title: 'Upload Failed',
                    detail: `Make sure to pass a valid file to upload.`,
                }),
            );
        }

        const key = `media_${uuidv1()}`;
        let processedImage;
        let storedMedia: {
            key: string;
            extensions: Array<string>;
        };

        // if image optimise it
        // upload file to AWS
        let isImageMime = IMAGE_MIMES.find(x => x === file.mimetype);
        if (isImageMime !== undefined) {
            processedImage = await processImage({
                input: file.data,
            });
            storedMedia = await storeMedia(processedImage.images, key);
        } else {
            storedMedia = await storeMedia(
                [
                    {
                        data: file.data,
                        mime: file.mimetype,
                        ext: mime.extension(file.mimetype) || '',
                    },
                ],
                key,
            );
        }

        // store entry in db
        const mediaDoc = await db.media.create({
            data: {
                key: key,
                alt: '',
                width:
                    isImageMime !== undefined
                        ? processedImage?.metadata.resolution[0] || 0
                        : 0,
                height:
                    isImageMime !== undefined
                        ? processedImage?.metadata.resolution[1] || 0
                        : 0,
                extensions: storedMedia.extensions,
                title: file.name,
            },
        });

        response.data.push({
            id: mediaDoc.id,
            type: 'media',
            attributes: mediaDoc,
        });

        res.status(200).json(response);
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        res.status(error.status).json({
            errors: [error],
        });
    }
};

export default uploadSingle;
