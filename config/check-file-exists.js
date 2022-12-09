(() => {
  const core = require("@actions/core");
  const fs = require("fs");
  const file = "scripts/deployment/deployentaddresses.json";

  try {
    if (fs.existsSync(file)) {
      console.log("File is exists");
    } else {
      throw new Error("File is not exists");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
