const os = require("os");
const path = require("path");
const fs = require("fs");

// console.log(path);

// console.log(os.totalmem());

// console.log(os.freemem());

fs.writeFileSync("newFile.js", " const a ='hello world'");
console.log("new file created successfully");

fs.appendFileSync("newFile.js", "   const b = 'hiiiii'");
console.log("new file created successfully");