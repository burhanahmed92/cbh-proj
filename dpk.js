

const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const hash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

const getCandidate = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY;
  if (event.partitionKey) return event.partitionKey;
  return hash(JSON.stringify(event));
};

const sanitizeCandidate = (candidate) => {
  if (typeof candidate !== "string") return hash(JSON.stringify(candidate));
  return candidate;
};

const truncateCandidate = (candidate) => {
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) return hash(candidate);
  return candidate;
};

exports.deterministicPartitionKey = (event) => {
  let candidate = getCandidate(event);
  candidate = sanitizeCandidate(candidate);
  return truncateCandidate(candidate);
};

