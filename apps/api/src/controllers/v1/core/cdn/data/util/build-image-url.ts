import C from 'oxygen-constants';

const ROUTE = `${C.API_DOMAIN}/v1/core/cdn/`;

export interface BuildURLsRes {
    src: string;
    extension: string;
}

const buildURLs = (
    prefix: 'library',
    key: string,
    extensions: Array<string>,
): Array<BuildURLsRes> => {
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
