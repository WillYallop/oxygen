import AWS from 'aws-sdk';

// bucket use for component and plugin versions, and all media
const s3Main = new AWS.S3({
    accessKeyId: process.env.AWS_S3_OXYGENAPI_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_OXYGENAPI_SECRET_ACCESS_KEY,
});

export default {
    main: s3Main,
};
