'use strict';

const config = require('../config/index');

module.exports = (req, res, next) => {

  let log = config.log();
  let result = [];
  
  Object.keys(req.headers).forEach((key) => {
    if (config.expected_headers.includes(key)) {
      result.push(key);
    }
  });

  if (!config.authorized) {
    if (result.length < 2) {
      log.error(`Failed to get mandatory headers expexted 3 got ${result.length}`)
      return res.status(428).json('They headers resource (Fiware-Service, Fiware-ServicePath) was not found');
    }
    next()
    return;
  }

  if (result.length < 3) {
    log.error(`Failed to get mandatory headers expexted 3 got ${result.length}`)
    return res.status(428).json('They headers resource (Fiware-Service, Fiware-ServicePath, X-Auth-Token) was not found');
  }

  next();
};
