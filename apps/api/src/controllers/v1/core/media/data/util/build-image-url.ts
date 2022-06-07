import C from 'oxygen-constants';

const ROUTE = `${C.API_DOMAIN}/v1/core/media/cdn/`;

const buildURLs = async (key: string, extensions: Array<string>) => {
    let urls = [];
    for (let i = 0; i < extensions.length; i += 1) {
        urls.push(`${ROUTE}${key}${extensions[i]}`);
    }
    return urls;
};

export default buildURLs;
