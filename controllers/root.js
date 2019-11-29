const request = require("request-promise");
const fs = require('fs');
var path = require('path');

const responseMessages = require("../utilities/utils");
const responseRules = require("../utilities/rules.json");
const url = require("../config").orion_url;
const defaultEntitiesAmount = require("../config").returnEntities;
const rules = require("../utilities");

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

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
      } else
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

function getTypeStructure(req, res) {
  var path_to_structure = path.normalize(__dirname + "/../extern_types/");
  let rawstructure = fs.readFileSync(path_to_structure + 'example.json');
  let structure = JSON.parse(rawstructure);
  if (!structure) {
    res.status(404).json(responseMessages[ "404" ]);
  } else {
    res.status(200).json(structure);
  }
}
function addEntityType(req, res) {
  var bodyObject = req.body;
  var newEntities = {};
  var newType = Object.keys(bodyObject)[0];
  var typeDescription = bodyObject[newType];
  var properties = Object.keys(typeDescription);
  newEntities[newType] = {};
  newEntities[newType].properties = {};
  for (let i = 0; i < properties.length; i++) {
    // console.log(properties[i]);
    if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "EntityID".toLowerCase()
    ) {
      newEntities[newType].properties["id"] = rules.idCheck;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "EntityType".toLowerCase()
    ) {
      newEntities[newType].properties["type"] = rules.typeCheck;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "Text".toLowerCase() ||
      typeDescription[properties[i]].type.toLowerCase() ==
      "Relationship".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities[newType].properties[properties[i]] = rules.mandatoryCheck;
      else newEntities[newType].properties[properties[i]] = rules.stringCheck;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "TextList(,)".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities[newType].properties[properties[i]] =
        rules.stringToArrayMandatory;
      else newEntities[newType].properties[properties[i]] = rules.stringToArray;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "NumberList(,)".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities[newType].properties[properties[i]] =
        rules.stringToArrayNumMandatory;
      else
        newEntities[newType].properties[properties[i]] = rules.stringToArrayNum;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "GeoJSON(Point)".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities[newType].properties[properties[i]] = rules.locationCheck;
      else
        newEntities[newType].properties[properties[i]] =
        rules.locationCheckNoMand;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "Float".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities[newType].properties[properties[i]] =
        rules.commaNumToUnitsMandatory;
      else newEntities[newType].properties[properties[i]] = rules.commaNumToUnits;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "Integer".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities[newType].properties[properties[i]] =
        rules.commaNumToUnitsIntMandatory;
      else
        newEntities[newType].properties[properties[i]] = rules.commaNumToUnitsInt;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "Datetime".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities[newType].properties[properties[i]] = rules.dateCheckMandatory;
      else newEntities[newType].properties[properties[i]] = rules.dateCheck;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "StructuredValue(JSON object)".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities[newType].properties[properties[i]] =
        rules.structuredValueMandatory;
      else newEntities[newType].properties[properties[i]] = rules.structuredValue;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "StructuredList([JSON objects])".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities[newType].properties[properties[i]] =
        rules.structuredListMandatory;
      else newEntities[newType].properties[properties[i]] = rules.structuredList;
    } else {
      console.log("Unknown property type exists: " + properties[i] + ", please check the structure");
      sendJSONresponse(res, 400, {
        message: "Unknown property type exists: " +
          properties[i] +
          ", please check the structure"
      });
      return;
    }
  }
  console.log(newEntities);
  sendJSONresponse(res, 200, {
    message: "Entity type: " +
      newType +
      " properly parsed and added to the system.",
    description: typeDescription,
    newObject: JSON.stringify(newEntities)
  });

}

module.exports = {
  getEntityByType,
  getEntities,
  getEntity,
  getRules,
  getRule,
  getTypeStructure,
  addEntityType
};
