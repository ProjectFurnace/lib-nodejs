const util = require("./util");

module.exports = async (dynamo, lookupId, data) => {
  const TableName = util.getTableName();

  if (Array.isArray(data)) {
    let batch = data.map((item) => ({
      PutRequest: { Item: { lookupId, ...item } },
    }));

    let query = { RequestItems: {} };
    query.RequestItems[TableName] = batch;

    await dynamo.batchWrite(query).promise();
  } else {
    await dynamo.put({ TableName, Item: { lookupId, ...data } }).promise();
  }
};
