module.exports.clone = async (path, url, username, token) => {
    const git = require('simple-git/promise')(path);

    const fullUrl = (username && token) ? `${url.replace("://", "://" + username + ":" + token + "@")}` : url;
    await git.clone(fullUrl, ".");
}

module.exports.checkout = async (path, tag) => {
    const git = require('simple-git/promise')(path);
    await git.checkout(tag);
}

module.exports.pull = async (path) => {
    const git = require('simple-git/promise')(path);
    await git.pull();
}

module.exports.init = async (path) => {
    const git = require('simple-git/promise')(path);
    await git.init();
}