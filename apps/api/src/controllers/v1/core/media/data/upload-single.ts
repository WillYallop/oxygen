import { Request, Response } from 'express';
import { UploadedFile, FileArray } from 'express-fileupload';
import { v1 as uuidv1 } from 'uuid';
import mime from 'mime-types';
import { Res_JSONBodyData } from 'oxygen-types';
import * as core from 'express-serve-static-core';
import C from 'oxygen-constants';
import buildURLs from '../../cdn/data/util/build-image-url';
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

export interface Params {
    mode: 'internal' | 'site';
    files: FileArray;
}

const uploadSingle = async (params: Params) => {
    try {
        // response
        let response: Res_JSONBodyData = {};

        // vefify files exists and set
        if (!params.files) {
            throw new Error(
                generateErrorString({
                    status: 400,
                    source: 'file',
                    title: 'Upload Failed',
                    detail: `Make sure to pass a valid file to upload.`,
                }),
            );
        }

        const keys: Array<string> = Object.keys(params.files);
        let file: UploadedFile;
        if (Array.isArray(params.files[keys[0]])) {
            const [firstFile] = params.files[keys[0]] as UploadedFile[];
            file = firstFile;
        } else file = params.files[keys[0]] as UploadedFile;

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
        if (params.mode === 'internal') allowedMimes = VALID_MIMBES.internal;
        else allowedMimes = VALID_MIMBES.site;
        // check uploaded file against allowed mimes
        const findMatchingMime = allowedMimes.find(x => x === file.mimetype);
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
        const isImageMime = IMAGE_MIMES.find(x => x === file.mimetype);
        let isImage = false;
        if (isImageMime !== undefined) {
            isImage = true;
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
                key,
                alt: '',
                is_image: isImage,
                width: isImage
                    ? processedImage?.metadata.resolution[0] || 0
                    : 0,
                height: isImage
                    ? processedImage?.metadata.resolution[1] || 0
                    : 0,
                extensions: storedMedia.extensions,
                title: file.name,
            },
        });

        response = {
            id: mediaDoc.id,
            type: 'media',
            attributes: {
                id: mediaDoc.id,
                alt: mediaDoc.alt,
                width: mediaDoc.width,
                height: mediaDoc.height,
                uploaded: mediaDoc.uploaded,
                modified: mediaDoc.modified,
                extensions: mediaDoc.extensions,
                title: mediaDoc.title,
                isImage: mediaDoc.is_image,
                src: await buildURLs(mediaDoc.key, mediaDoc.extensions),
            },
        };

        return response;
    } catch (err) {
        throw err;
    }
};

export default uploadSingle;
