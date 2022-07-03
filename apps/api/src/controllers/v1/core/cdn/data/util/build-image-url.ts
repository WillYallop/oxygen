import C from 'oxygen-constants';
import { Util_BuildURLsRes } from 'oxygen-types';

const ROUTE = `${C.API_DOMAIN}/v1/core/cdn/`;

const buildURLs = (
    prefix: 'library',
    key: string,
    extensions: Array<string>,
): Array<Util_BuildURLsRes> => {
    const urls = [];
    for (let i = 0; i < extensions.length; i += 1) {
        urls.push({
            src: `${ROUTE}${prefix}/${key}${extensions[i]}`,
            extension: extensions[i],
        });
    }
    return urls;
};

export default buildURLs;
