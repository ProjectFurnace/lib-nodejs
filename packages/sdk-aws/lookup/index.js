const dynamo = require("./dynamo");

const get = require("./get");
const set = require("./set");

module.exports.get = async (lookupId, keyId) => {
  return await get(dynamo(), lookupId, keyId);
};

module.exports.set = async (lookupId, item) => {
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
