const entities = require("./entities");
const { fileCheck } = require("./checks");
const codeCheck = require("./checks").codeChecker;
const headersCheck = require("./checks").headerCheck;
const parser = require("./parser");

module.exports = {
  entities,
  fileCheck,
  codeCheck,
  headersCheck,
  parser,
};
