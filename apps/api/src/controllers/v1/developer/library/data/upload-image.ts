import { Request, Response } from 'express';
import { Res_JSONBody, Res_ExpressError } from 'oxygen-types';
import C from 'oxygen-constants';
import * as core from 'express-serve-static-core';
import niv, { Validator } from 'node-input-validator';
import { ComponentLibrary } from '@prisma/client';
import media from '../../../core/media';
import buildURLs from '../../../core/cdn/data/util/build-image-url';
import {
    generateErrorString,
    parseErrorString,
    resNodeInputValidatorError,
} from '../../../../../utils/error-handler';
import db from '../../../../../utils/prisma-client';

// * Description
/*  
    Upload an image to the libraryMedia table
*/

export interface Params extends core.ParamsDictionary {
    type: 'component' | 'plugin' | 'kit';
    id: ComponentLibrary['id'];
    tag: 'icon' | 'banner' | 'preview' | 'desktop' | 'mobile' | 'tablet';
}

const updateSingle = async (
    req: Request<Params>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // extend niv validator
        niv.extend('tag_check', (data: { value: string }) => {
            if (
                data.value === 'icon' ||
                data.value === 'banner' ||
                data.value === 'preview' ||
                data.value === 'desktop' ||
                data.value === 'mobile' ||
                data.value === 'tablet'
            ) {
                return true;
            }
            return false;
        });

        // validate body config
        const v = new Validator(req.params, {
            id: 'required',
            tag: 'required|tag_check',
        });

        // if valid
        const passed = await v.check();

        if (passed) {
            // response
            const response: Res_JSONBody = {
                links: {
                    self: `${C.API_DOMAIN}/v1/dev/library/media/${req.params.type}/${req.params.id}/${req.params.tag}`,
                },
                data: [],
            };

            // check if the component library exists
            const compExists = await db.componentLibrary.findUnique({
                where: {
                    id: req.params.id,
                },
            });
            if (!compExists) {
                throw new Error(
                    generateErrorString({
                        status: 404,
                        source: 'id',
                        title: 'Component Doesnt Exist',
                        detail: `A component library doc with an ID of "${req.params.id}" cannt be found!`,
                    }),
                );
            }

            // upload image
            const imageUpload = await media.uploadSingle({
                mode: 'internal',
                files: req.files,
            });

            let libraryMediaRes;
            if (req.params.type === 'component') {
                libraryMediaRes = await db.componentLibraryMedia.create({
                    data: {
                        key: imageUpload.key,
                        title: imageUpload.title,
                        extensions: imageUpload.extensions,
                        library_id: req.params.id,
                        tag: req.params.tag,
                        alt: '',
                        width: imageUpload.width,
                        height: imageUpload.height,
                    },
                });
            } else if (req.params.type === 'plugin') {
                libraryMediaRes = await db.pluginLibraryMedia.create({
                    data: {
                        key: imageUpload.key,
                        title: imageUpload.title,
                        extensions: imageUpload.extensions,
                        library_id: req.params.id,
                        tag: req.params.tag,
                        alt: '',
                        width: imageUpload.width,
                        height: imageUpload.height,
                    },
                });
            } else if (req.params.type === 'kit') {
                libraryMediaRes = await db.kitLibraryMedia.create({
                    data: {
                        key: imageUpload.key,
                        title: imageUpload.title,
                        extensions: imageUpload.extensions,
                        library_id: req.params.id,
                        tag: req.params.tag,
                        alt: '',
                        width: imageUpload.width,
                        height: imageUpload.height,
                    },
                });
            }

            if (libraryMediaRes) {
                response.data.push({
                    id: libraryMediaRes.id,
                    type: 'libraryMedia',
                    attributes: {
                        ...libraryMediaRes,
                        src: await buildURLs(
                            imageUpload.key,
                            imageUpload.extensions,
                        ),
                    },
                });
            }

            // success response
            res.status(200).json(response);
        } else resNodeInputValidatorError(v.errors, res);
    } catch (err) {
        const error = await parseErrorString(err as Error | string);
        res.status(error.status).json({
            errors: [error],
        });
    }
};

export default updateSingle;
