module.exports.getTableName = () => {
  return "test-lookup";
  return `${process.env.STACK_NAME}-lookup-${process.env.STACK_ENV}`;
};
