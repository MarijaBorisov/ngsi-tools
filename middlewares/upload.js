const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStoragem,
  limits: {
    fileSize: 30 * 1024 * 1024,
  },
}).any();

module.exports = {
  multer,
};
