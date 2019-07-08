const request = require("request-promise");
const responseMessages = require("../utilities/utils");
const responseRules = require("../utilities/rules.json");
const url = require("../config").orion_url;
const defaultEntitiesAmount = require("../config").returnEntities;

function getEntities(req, res) {
  return request({
    method: "GET",
    headers: {
      "Fiware-Service": req.headers[ "fiware-service" ],
      "Fiware-ServicePath": req.headers[ "fiware-servicepath" ],
      "X-Auth-Token": req.headers[ "x-auth-token" ],
    },
    uri: `${ url }v2/entities?limit=${ req.query.count || defaultEntitiesAmount }`,
    json: true,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      if (error.statusCode === 401) {
        res.status(401).json("User token not authorized");
      }
      res.status(500).json(responseMessages[ "500" ]);
    });
}

function getEntity(req, res) {
  return request({
    method: "GET",
    headers: {
      "Fiware-Service": req.headers[ "fiware-service" ],
      "Fiware-ServicePath": req.headers[ "fiware-servicepath" ],
      "X-Auth-Token": req.headers[ "x-auth-token" ],
    },
    uri: `${ url }v2/entities?id=${ req.params.id }`,
    json: true,
  })
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json(responseMessages[ "404" ]);
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      res.status(responseMessages[ "500" ]).json(error);
    });
}

function getEntityByType(req, res) {
  return request({
    method: "GET",
    headers: {
      "Fiware-Service": req.headers[ "fiware-service" ],
      "Fiware-ServicePath": req.headers[ "fiware-servicepath" ],
      "X-Auth-Token": req.headers[ "x-auth-token" ],
    },
    uri: `${ url }v2/entities?type=${ req.params.id }`,
    json: true,
  })
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json(responseMessages[ "404" ]);
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      res.status(responseMessages[ "500" ]).json(error);
    });
}

function getRules(req, res) {
  if (!responseRules.rules) {
    res.status(404).json(responseMessages[ "404" ]);
  } else {
    res.status(200).json(responseRules.rules);
  }
}

function getRule(req, res) {
  if (!responseRules[ req.params.id ]) {
    res.status(404).json(responseMessages[ "404" ]);
  } else {
    res.status(200).json(responseRules[ req.params.id ]);
  }
}

module.exports = {
  getEntityByType,
  getEntities,
  getEntity,
  getRules,
  getRule,
};
