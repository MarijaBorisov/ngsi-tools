const config = {};

config.orion_url = "http://localhost:1026/";

config.api_port = "3002";

config.ext = [ ".csv", ".json" ];

config.https = true;

config.authorization = true;

config.returnEntities = 20;

config.batch_size = 150;

config.db = {
  url: "mongodb://localhost:27017/w4t-entities",
  options: {
    user: '',
    pass: '',
    useNewUrlParser: true
  },
}

module.exports = config;
