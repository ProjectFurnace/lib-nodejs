const sqs = require("./sqs");
const { getQueueUrl } = require("./util");

module.exports.publish = async (queue, event) => {
  const result = await sqs()
    .sendMessage({
      MessageBody: JSON.stringify(event),
      QueueUrl: getQueueUrl(queue),
    })
    .promise();

  console.log(result);
};
