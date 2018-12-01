export async function createBucket(bucket, region): any;
export async function deleteBucket(bucket): any;
export async function getObjectMetadata(bucket, key): any;
export async function upload(bucket, name, filePath): any;
export async function objectExists(bucket, name): any;
export async function listObjects(bucket, prefix, delimiter): any;
export async function deleteObject(bucket, key): any;