
const { deterministicPartitionKey } = require("./dpk");
const MAX_PARTITION_KEY_LENGTH = 256;
describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Uses event.partitionKey if it exists", () => {
    const partitionKey = deterministicPartitionKey({ partitionKey: "test" });
    expect(partitionKey).toBe("test");
  });

  it("Hashes the stringified event if no partitionKey is present", () => {
    const partitionKey = deterministicPartitionKey({ test: "test" });
    expect(partitionKey).toHaveLength(128);
  });

  it("Hashes the partitionKey if its length exceeds MAX_PARTITION_KEY_LENGTH", () => {
    const longString = "a".repeat(MAX_PARTITION_KEY_LENGTH + 1);
    const partitionKey = deterministicPartitionKey({ partitionKey: longString });
    expect(partitionKey).toHaveLength(128);
  });
});


