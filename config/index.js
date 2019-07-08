const bunyan = require('bunyan');
const maincfg = require('../config');

const log = {
  development: () => {
    return bunyan.createLogger({ name: 'Ngsi-Connector-API-development', level: 'debug' });
  },
  evelopment: () => {
    return bunyan.createLogger({ name: 'Ngsi-Connector-API-production', level: 'info' });
  },
  evelopment: () => {
    return bunyan.createLogger({ name: 'Ngsi-Connector-API-test', level: 'fatal' });
  },
};

module.exports = {
  authorized: maincfg.authorization,
  fiware_orion_url: maincfg.orion_url,
  ngsi_connector_port: maincfg.api_port,
  run_server_protocol: 'http',
  allowed_file_extentions: [".csv", ".json"],
  default_return_entities: 100,
  expected_headers: ["fiware-service", "fiware-servicepath", "x-auth-token"],
  log: (env) => {
    if (env)
      return log[env]();
    return log[process.env.NODE_ENV || 'development']();
  },
};