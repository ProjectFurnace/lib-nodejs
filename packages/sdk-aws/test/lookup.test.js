const lookup = require("../lookup");

describe("lookup", () => {
  describe("get", () => {
    it("should return single result", async () => {
      const result = await lookup.get("lookup1", "key1");
      expect(result).toBeDefined();
      console.log(result);
    });

    it("should return array of results", async () => {
      const result = await lookup.get("lookup2");
      expect(result).toBeInstanceOf(Array);
      console.log(result);
    });
  });

  describe("set", () => {
    it("should write one item", async () => {
      await lookup.set("lookup3", {
        keyId: "key2",
        field1: "val2",
      });
    });

    it("should write array of items", async () => {
      await lookup.set("lookup4", [
        {
          keyId: "key1",
          field1: "val1",
        },
        {
          keyId: "key2",
          field1: "val2",
        },
      ]);
    });
  });
});
