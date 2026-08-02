export function makeId() { // rename func to a better name, can be inside helpers file
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return globalThis.crypto.randomUUID();
  }
  return String(Date.now());
}
