const app = require('../app');
const config = require('../config/index');
const fs = require('fs');
const path = require('path')
log = config.log();

if (!config.run_server_protocol === 'https' || !config.run_server_protocol === 'http')
  throw new Error(`Invalid protocol passed in configurations expected HTTP or HTTPS bug got ${config.run_server_protocol}`);
if (!config.ngsi_connector_port)
  log.info(`No port was specified via configurations, application running using defaul port 3000`);

const protocol = require(`${config.run_server_protocol}`);
const port = config.ngsi_connector_port || 3000;

if (config.run_server_protocol === 'http') {
  var server = protocol.createServer(app);
} else {
  var server = protocol.createServer({
    key: fs.readFileSync(path.join(__dirname, '../privateKey.key')),
    cert: fs.readFileSync(path.join(__dirname, '../certificate.crt'))
  }, app);
}

server.timeout = 20 * 60 * 1000;
server.listen(port);
server.on('listening', () => {
  log.info(`NGSIConnector is listening on ${server.address().port} in ${app.get('env')} mode.`)
});

module.exports = server;