import s3Clients from '../../../../../../utils/s3-clients';
import { generateErrorString } from '../../../../../../utils/error-handler';

interface StoreMediaFiles {
    data: Buffer;
    mime: string;
    ext: string;
}

const storeWithS3 = async (
    data: Buffer,
    key: string,
    mime: string | string,
): Promise<{ success: boolean }> =>
    new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.AWS_S3_MAIN_BUCKET_NAME as string,
            Key: key,
            Body: data,
            ContentType: mime,
        };
        s3Clients.main.upload(params, (err: Error) => {
            if (err) {
                resolve({
                    success: false,
                });
            } else {
                resolve({
                    success: true,
                });
            }
        });
    });

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
