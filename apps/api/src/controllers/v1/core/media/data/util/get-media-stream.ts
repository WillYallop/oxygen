import s3Clients from '../../../../../../utils/s3-clients';

const getMediaStream = (key: string) => {
    const params = {
        Key: key,
        Bucket: process.env.AWS_S3_MAIN_BUCKET_NAME as string,
    };
    return s3Clients.main.getObject(params).createReadStream();
};

export default getMediaStream;
