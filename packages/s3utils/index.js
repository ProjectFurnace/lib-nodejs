const AWS = require('aws-sdk')
    , fs = require("fs")
    ;

const s3 = new AWS.S3();

module.exports.createBucket = async (bucket, region) => {
    const result = await s3.createBucket({ 
        Bucket: bucket,
        CreateBucketConfiguration: {
            LocationConstraint: region
        }
    }).promise();

    return result;
}

module.exports.deleteBucket = async bucket => {
    const result = await s3.deleteBucket({ 
        Bucket: bucket
    }).promise();

    return result;
}

module.exports.getObjectMetadata = async (bucket, key) => {

    const result = await s3.headObject({ 
        Bucket: bucket,
        Key: key
    }).promise();

    return result;
}

module.exports.upload = async (bucket, name, filePath) => {
    
    const result = await s3.upload({
        Bucket: bucket,
        Key: name,
        Body: fs.createReadStream(filePath),
        // Metadata: {

        // },
        // Tagging: ""
    }).promise();

    return result;
}

module.exports.objectExists = async (bucket, name) => {
    try{
        const result = await module.exports.getObjectMetadata(bucket, name);
        return true;
    } catch (err) {
        return false;
    }
}

module.exports.bucketExists = async (bucket) => {
    try{
        const result = await s3.headBucket({ Bucket: bucket }).promise();
        return true;
    } catch (err) {
        return false;
    }
}

module.exports.listObjects = async (bucket, prefix, delimiter) => {

    const result = await s3.listObjectsV2({
        Bucket: bucket,
        Delimiter: delimiter,
        Prefix: prefix
    }).promise();

    return result;
}

module.exports.deleteObject = async (bucket, key) => {

    const result = await s3.deleteObject({
        Bucket: bucket,
        Key: key
    }).promise();

    return result;
}