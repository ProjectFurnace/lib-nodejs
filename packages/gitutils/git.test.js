const git = require(".");
const fs =  require("@project-furnace/fsutils");

const checkRepo = "https://github.com/steveukx/git-js";
const checkFile = "package.json";

describe('git', () => {
    it('should successfully clone repo', async () => {
        const dir = await cloneRepo(checkRepo, null, null, checkFile);
        fs.rimraf(dir);
    });

    // it('should successfully clone repo with auth', async () => {
    //     const dir = await cloneRepo("https://github.com/ProjectFurnace/another-test", "danny-waite", "123", "README.md");
    //     rimraf.sync(dir);
    // });

    it('should successfully checkout tag', async () => {
        const dir = await cloneRepo(checkRepo, null, null, checkFile);
        await git.checkout(dir, "v1.106.0");
        fs.rimraf(dir);
    });
});

async function cloneRepo(repo, username, token, checkFile) {
    const dir = await fs.createTempDirectory();

    const result = await git.clone(dir, repo, username, token);

    const exists = fs.exists(dir + "/" + checkFile);
    expect(exists).toBe(true);

    return dir;
}