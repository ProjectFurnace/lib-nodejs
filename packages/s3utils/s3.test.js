const s3 = require(".")
    , fsUtils = require("@project-furnace/fsutils")
    , randomUtils = require("@project-furnace/randomutils");
    ;
describe('s3', async () => {

    let bucket;
    let objectName;



    beforeAll(async () => {
        bucket = "furnace-build-test3" //+ await random.number(1000, 100000).toString();
        const bucketExists = await s3.bucketExists(bucket);

        if (!bucketExists) {
            await s3.createBucket(bucket, "eu-west-1");
        }
    })

    afterEach(async () => {
        s3.deleteObject(bucket, objectName); // cleanup
    })

    afterAll(async () => {
        // await s3.deleteBucket(bucket);
    })

    describe('uploadFile', () => {
        it('should successfully upload to S3', async () => {
            objectName = "testFile";
            const result = await uploadFile(bucket, objectName);

            expect(result.response.Key).toBe(objectName);
            expect(result.response.Bucket).toBe(bucket);

        });
    });

    describe('getObjectMetadata', () => {
        it('should get object MetaData', async () => {
            objectName = "testMetadataFile";
            const result = await uploadFile(bucket, objectName);
    
            const metaDataResult = await s3.getObjectMetadata(bucket, objectName);
    
            expect(metaDataResult).toBeDefined();
         
        });
    });

    describe('objectExists', () => {
        it('should return true when key exists', async () => {
            objectName = "testExistsFile";

            const result = await uploadFile(bucket, objectName);
            const exists = await s3.objectExists(bucket, objectName);
            expect(exists).toBe(true);
 
        });

        it('should return false when key does not exist', async () => {
            objectName = "idontexist"
            ;
            const exists = await s3.objectExists(bucket, objectName);
            expect(exists).toBe(false);
        });
    });

    describe('listObjects', () => {
        it('should list objects with prefix', async () => {
            const rand = await randomUtils.number(100000, 100000000)
                , prefix = "testListObjectsWithPrefixFile/"
                ;

            objectName = `${prefix}${rand}`;

            await uploadFile(bucket, objectName);
            const result = await s3.listObjects(bucket, prefix, "/");
            
            const key = result.Contents.find(o => o.Key === objectName);
            expect(key).toBeDefined();
            expect(key.Key).toBe(objectName);
        });
    });

    describe('deleteObject', () => {
        it('should successfully delete Object', async () => {
            objectName = "testDeleteFile";

            await uploadFile(bucket, objectName);
            const result = await s3.deleteObject(bucket, objectName);
            expect(result).toMatchObject({});
        });
    });
});

async function uploadFile(bucket, name) {
    const tmpFile = await fsUtils.createTempPath() + ".txt";

    fsUtils.writeFile(tmpFile, "build test file");
    const response = await s3.upload(bucket, name, tmpFile);
    expect(response.Key).toBe(name); 

    fsUtils.rimraf(tmpFile); 

    return {
        tmpFile,
        response
    };
}