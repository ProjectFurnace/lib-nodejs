const fsUtil = require("..")
    , fs = require("fs")
    , path = require("path")
    ;

describe('fs', () => {
    describe('exists', () => {
        it('should return true when file found', () => {
            const file = fsUtil.createTempPath();
            fs.writeFileSync(file, "test");

            expect(fsUtil.exists(file)).toBe(true);
        });
    });

    describe('writeFile', () => {
        it('should successfully write file', () => {
            const file = fsUtil.createTempPath();
            fsUtil.writeFile(file);
            const found = fsUtil.exists(file);
            expect(found).toBe(true);
        });
    });

    describe('listDirectory', () => {
        it('should return correct list of files', async () => {
            const files = ["file1", "file2"]
                , dir = fsUtil.createTempDirectory()
                ;

            for (let file of files) {
                fsUtil.writeFile(path.join(dir, file), "test");
            }

            const result = fsUtil.listDirectory(dir);
            expect(result).toHaveLength(2); 
            expect(result).toMatchObject([ "file1", "file2" ]);
            
            fsUtil.rimraf(dir);
        });
    });

});