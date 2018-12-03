const fs = require("fs")
    , rimraf = require("rimraf")
    , fsExtra = require("fs-extra")
    , tmp = require("tmp")
    ;

module.exports.exists = (file) => {
    return fs.existsSync(file);
}

module.exports.mkdir = (dir) => {
    fs.mkdirSync(dir);
}

module.exports.rimraf = (file) => {
    rimraf.sync(file);
}

module.exports.createTempDirectory = () => {
    const dir = tmp.dirSync().name;
    return dir;
}

module.exports.createTempPath = () => {
    return tmp.fileSync().name;
}

module.exports.cp = (src, dest) => {
    fsExtra.copySync(src, dest);
}

module.exports.writeFile = (file, contents) => {
    fs.writeFileSync(file, contents);
}

module.exports.listDirectory = (dir) => {
    const files = fs.readdirSync(dir);
    return files;
}

module.exports.stat = (file) => {
    return fs.lstatSync(file);
}

module.exports.readFile = (file) => {
    return fs.readFileSync(file, "utf8");
}
