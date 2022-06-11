import s3Clients from './s3-clients';

const storeWithS3 = async (
    data: Buffer,
    key: string,
    mime: string,
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

export default storeWithS3;
