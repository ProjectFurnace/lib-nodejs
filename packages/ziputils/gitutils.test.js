const fsUtils = require("@project-furnace/fsutils");
const path = require("path");
const zip = require(".");

describe('zip', () => {
    it('should successfully zip directory', async () => {
        const tempDir = await fsUtils.createTempDirectory();
        const tempFile = await fsUtils.createTempPath();

        fsUtils.writeFile(path.join(tempDir, "text.txt"));

        await zip.compress(tempDir, tempFile);

        fsUtils.rimraf(tempDir);
        fsUtils.rimraf(tempFile);
    });
});