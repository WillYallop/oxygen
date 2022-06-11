import { generateErrorString } from '../../../../../../utils/error-handler';
import storeWithS3 from '../../../../../../utils/store-with-s3';

interface StoreMediaFiles {
    data: Buffer;
    mime: string;
    ext: string;
}

const storeMedia = async (files: Array<StoreMediaFiles>, key: string) => {
    const extensions: Array<string> = [];

    const results = [];
    for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        results.push(storeWithS3(file.data, `${key}${file.ext}`, file.mime));
        extensions.push(file.ext);
    }

    const allRes = await Promise.all(results);
    allRes.forEach(res => {
        if (!res.success) {
            throw new Error(
                generateErrorString({
                    status: 500,
                    source: '',
                    title: 'Unexpected Error',
                    detail: `An unexpected error occurred while uploading your media!`,
                }),
            );
        }
    });

    return {
        key,
        extensions,
    };
};

export default storeMedia;
