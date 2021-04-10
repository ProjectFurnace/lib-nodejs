const queue = require("../queue/index");
const util = require("../queue/util");

process.env.AWS_REGION = "eu-west-1";
process.env.AWS_ACCOUNT_ID = "123";
process.env.STACK_NAME = "quotes";
process.env.STACK_ENV = "sandbox";

describe("queue", () => {
  describe.only("publish", () => {
    it("should send message", async () => {
      await queue.publish("quote", { hello: "world" });
    });
  });

  describe("util", () => {
    it("should return correct queue url", () => {
      const url = util.getQueueUrl("quote-delay");
      console.log(url);
      // expect(url).toBe("")
    });
  });
});
