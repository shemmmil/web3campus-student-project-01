(() => {
  const core = require("@actions/core");
  const fs = require("fs");
  const file = "scripts/deployment/deployentaddresses.json";

  try {
    if (fs.existsSync(file)) {
      const bufferJson = fs.readFileSync(file);
      const json = JSON.parse(bufferJson);

      const value = findVal(json, "2InchToken");

      if (value === undefined) {
        throw Error("Key 2InchToken not found");
      }

      const removeSpace = value.trim();

      const isCorrectValue = removeSpace.startsWith("0x");

      if (!isCorrectValue) {
        throw Error("Value does not start with 0x");
      }
    } else {
      throw new Error("File is not exists");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();

function findVal(object, key) {
  let value;

  Object.keys(object).some((k) => {
    if (k === key) {
      value = object[k];
      return true;
    }
    if (object[k] && typeof object[k] === "object") {
      value = findVal(object[k], key);
      return value !== undefined;
    }
  });

  return value;
}
