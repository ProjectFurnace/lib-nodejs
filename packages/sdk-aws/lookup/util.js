module.exports.getTableName = () => {
  return `${process.env.STACK_NAME}-lookup-${process.env.STACK_ENV}`;
};
