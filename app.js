const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const request = require("request-promise");

const mongoose = require("mongoose");
var models_path = path.normalize(__dirname + '/models');
var conf_path = path.normalize(__dirname + '/config');
const conf = require(conf_path);

global.conn = mongoose.createConnection(conf.db.url, conf.db.options , (err, db) => {
   if (err) {
     return console.log(err);
   }
   console.log("Connected successfully to mongo server");
 });
require(models_path + "/entityType.js");

const entities = require("./routes/entities")();

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", entities);

setInterval(function() {
  request({
      method: "GET",
      headers: {
          "Fiware-Service": "waste4think",
          "Fiware-ServicePath": "/deusto/w4t/cascais/real",
          "X-Auth-Token": "DevelopmentTest",
      },
      uri: "http://backend.waste4think.eu/connector/entities",
      json: true
  })
  .then(res => console.log(res))
  .catch(err => console.log("Sent request to Ngsi Connector API"))
}, 5 * 60 * 1000)

setInterval(function() {
  request({
      method: "GET",
      headers: {
          "Fiware-Service": "waste4think",
          "Fiware-ServicePath": "/deusto/w4t/cascais/real",
          "X-Auth-Token": "DevelopmentTest",
      },
      uri: "http://backend.waste4think.eu/connector/test/entities",
      json: true
  })
  .then(res => console.log(res))
  .catch(err => console.log("Sent request to Test Ngsi Connector API"))
}, 5 * 60 * 1000)

app.use((req, res, next) => {
  const error = new Error("Requested route not found, more information on available routes can be found in README file.");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
