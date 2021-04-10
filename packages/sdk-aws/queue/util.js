module.exports.getQueueUrl = (name) => {
  const {
    AWS_REGION: region,
    AWS_ACCOUNT_ID: accountId,
    STACK_NAME: stackName,
    STACK_ENV: env,
  } = process.env;

  return `https://sqs.${region}.amazonaws.com/${accountId}/${stackName}-${name}-${env}`;
};
