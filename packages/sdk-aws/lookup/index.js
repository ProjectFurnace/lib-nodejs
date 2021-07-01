const dynamo = require("./dynamo");

const get = require("./get");
const set = require("./set");

const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL || 0 });

module.exports.get = async (lookupId, keyId) => {
  let value = cache.get(lookupId + keyId);
  if (value == undefined) {
    value = await get(dynamo(), lookupId, keyId);
    cache.set(lookupId + keyId, value);
  }
  return value;
};

module.exports.set = async (lookupId, item) => {
  const { keyId } = item;
  cache.set(lookupId + keyId, item);
  return await set(dynamo(), lookupId, item);
};

module.exports.destroy = async () => {
  //
};

module.exports.increment = async () => {
  //
};

module.exports.decrement = async () => {
  //
};

module.exports.count = async () => {
  //
};
