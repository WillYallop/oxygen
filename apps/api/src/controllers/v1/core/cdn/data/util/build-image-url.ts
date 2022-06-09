import C from 'oxygen-constants';

const ROUTE = `${C.API_DOMAIN}/v1/core/cdn/`;

const buildURLs = async (
    prefix: 'library',
    key: string,
    extensions: Array<string>,
) => {
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
