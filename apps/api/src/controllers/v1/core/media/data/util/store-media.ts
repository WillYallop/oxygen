import s3Clients from '../../../../../../utils/s3-clients';

interface StoreMediaFiles {
    data: Buffer;
    mime: string;
    ext: string;
}

const storeWithS3 = (data: Buffer, key: string, mime: string | string) => {
    try {
        const params = {
            Bucket: process.env.AWS_S3_VERSIONS_BUCKET_NAME as string,
            Key: key,
            Body: data,
            ContentType: mime,
            ACL: 'public-read',
        };
        s3Clients.versions.upload(params, (err: Error) => {
            if (err) {
                throw err;
            }
        });
    } catch (err) {
        throw err;
    }
};

const storeMedia = async (files: Array<StoreMediaFiles>, key: string) => {
    try {
        const extensions: Array<string> = [];
        for await (const file of files) {
            storeWithS3(file.data, `${key}.${file.ext}`, file.mime);
            extensions.push(file.ext);
        }
        return {
            key: key,
            extensions: extensions,
        };
    } catch (err) {
        throw err;
    }
};

export default storeMedia;
