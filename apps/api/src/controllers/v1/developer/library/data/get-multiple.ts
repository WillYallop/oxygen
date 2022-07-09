import { Request, Response } from 'express';
import {
    D_Library_GetMultipleLibraryRes,
    Res_ExpressError,
} from 'oxygen-types';
import C from 'oxygen-constants';
import * as core from 'express-serve-static-core';
import { Library } from '@prisma/client';
import niv, { Validator } from 'node-input-validator';
import getImages from './util/get-images';
import { libraryTypeCb } from '../../../../../utils/niv-extend-callbacks';
import {
    parseErrorString,
    resNodeInputValidatorError,
} from '../../../../../utils/error-handler';
import db from '../../../../../utils/prisma-client';

// * Description
/*  
    Get multiple library docs. Only has basic filtering for created field.
*/

export interface Params extends core.ParamsDictionary {
    type: 'component' | 'plugin' | 'kit';
    cursor: Library['id'] | 'start';
    take: string;
    order: 'asc' | 'desc';
}

const getMultiple = async (
    req: Request<Params>,
    res: Response<Res_ExpressError>,
) => {
    try {
        // extend niv validator
        niv.extend('type_check', libraryTypeCb);

        // validate body config
        const v = new Validator(req.params, {
            type: 'required|type_check',
            cursor: 'required',
            take: 'required',
            order: 'required',
        });

        // if valid
        const passed = await v.check();

        if (passed) {
            // response
            const response: D_Library_GetMultipleLibraryRes = {
                links: {
                    self: `${C.API_DOMAIN}/v1/dev/library/${req.params.type}/${req.params.cursor}/${req.params.take}/${req.params.order}`,
                    next: undefined,
                },
                data: [],
            };

            const cursorQueryObj = {
                id: req.params.cursor,
            };

            // get multiple
            const take = parseInt(req.params.take, 10) + 1;
            const libResults = await db.library.findMany({
                take: take, // get one greater so we can determine if their is a next
                cursor:
                    req.params.cursor === 'start' ? undefined : cursorQueryObj,
                where: {
                    developer_id: {
                        equals: req.auth?.id,
                    },
                    type: {
                        equals: req.params.type,
                    },
                },
                orderBy: {
                    created: req.params.order,
                },
            });

            const buildLibResArr = [];
            const buildLibRes = async (library: Library) => ({
                id: library.id,
                type: 'library',
                attributes: {
                    id: library.id,
                    type: library.type,
                    deactivated: library.deactivated,
                    verified: library.verified,
                    created: library.created,
                    modified: library.modified,
                    library_name: library.library_name,
                    name: library.name,
                    description: library.description,
                    public: library.public,
                    images: await getImages(library.id, 'multiple'),
                },
            });

            for (
                let i = 0;
                i <
                (libResults.length === take
                    ? libResults.length - 1
                    : libResults.length);
                i += 1
            ) {
                buildLibResArr.push(buildLibRes(libResults[i]));
            }
            response.data.push(...(await Promise.all(buildLibResArr)));

            if (libResults.length === take && response.links) {
                response.links.next = `${C.API_DOMAIN}/v1/dev/library/${
                    req.params.type
                }/${libResults[libResults.length - 1].id}/${req.params.take}/${
                    req.params.order
                }`;
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

export default getMultiple;
