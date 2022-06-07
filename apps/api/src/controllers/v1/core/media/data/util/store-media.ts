import s3Clients from '../../../../../../utils/s3-clients';

interface StoreMediaFiles {
    data: Buffer;
    mime: string;
    ext: string;
}

const storeWithS3 = (data: Buffer, key: string, mime: string | string) => {
    const params = {
        Bucket: process.env.AWS_S3_MAIN_BUCKET_NAME as string,
        Key: key,
        Body: data,
        ContentType: mime,
    };
    s3Clients.main.upload(params).promise();
};

const storeMedia = async (files: Array<StoreMediaFiles>, key: string) => {
    const extensions: Array<string> = [];
    for (let i = 0; i < files.length; i += 1) {
        storeWithS3(files[i].data, `${key}${files[i].ext}`, files[i].mime);
        extensions.push(files[i].ext);
    }
    return {
        key,
        extensions,
    };
};

export default storeMedia;
