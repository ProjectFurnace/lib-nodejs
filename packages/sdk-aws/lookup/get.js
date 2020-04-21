const util = require("./util");

module.exports = async (dynamo, lookupId, keyId) => {
  const TableName = util.getTableName();
  let Key = { lookupId };

  if (keyId) {
    // get a single item
    Key.keyId = keyId;

    const result = await dynamo.get({ TableName, Key }).promise();
    return result.Item;
  } else {
    // return list of all items in key
    const result = await dynamo
      .query({
        TableName,
        KeyConditionExpression: "lookupId = :lookupId",
        ExpressionAttributeValues: {
          ":lookupId": lookupId,
        },
      })
      .promise();

    return result.Items;
  }
};
