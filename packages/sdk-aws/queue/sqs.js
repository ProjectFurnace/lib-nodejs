const SQS = require("aws-sdk/clients/sqs");

let sqs; // = new SQS();

module.exports = () => {
  if (!sqs) {
    sqs = new SQS({
      region: process.env.REGION || "eu-west-1",
    });
  }
  return sqs;
};
