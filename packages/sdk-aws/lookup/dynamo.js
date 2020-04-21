const DynamoDB = require("aws-sdk/clients/dynamodb");

let documentClient;

module.exports = () => {
  if (!documentClient) {
    documentClient = new DynamoDB.DocumentClient({
      region: process.env.REGION || "eu-west-1",
    });
  }
  return documentClient;
};
