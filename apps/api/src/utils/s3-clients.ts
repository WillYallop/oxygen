import AWS from 'aws-sdk';

// bucket for component and plugin versions
const s3Versions = new AWS.S3({
    accessKeyId: process.env.AWS_S3_VERSIONS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_VERSIONS_SECRET_ACCESS_KEY,
});

export default {
    versions: s3Versions,
};
