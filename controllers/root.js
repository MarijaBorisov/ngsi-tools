const request = require("request-promise");
const fs = require('fs');
var path = require('path');

const responseMessages = require("../utilities/utils");
const responseRules = require("../utilities/rules.json");
const url = require("../config").orion_url;
const defaultEntitiesAmount = require("../config").returnEntities;
const rules = require("../utilities");
var EnityType = global.conn.model("EntityType");

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
  newEntities.entityType = newType;
  newEntities.properties = {};
  for (let i = 0; i < properties.length; i++) {
    // console.log(properties[i]);
    if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "EntityID".toLowerCase()
    ) {
      newEntities.properties["id"] = "idCheck";//rules.idCheck;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "EntityType".toLowerCase()
    ) {
      newEntities.properties["type"] = "typeCheck";//rules.typeCheck;
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
        newEntities.properties[properties[i]] = "mandatoryCheck";//rules.mandatoryCheck;
      else newEntities.properties[properties[i]] = "stringCheck";//rules.stringCheck;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "TextList(,)".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] =
          rules.stringToArrayMandatory;
      else newEntities.properties[properties[i]] = "stringToArray";//rules.stringToArray;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "NumberList(,)".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] =
          rules.stringToArrayNumMandatory;
      else
        newEntities.properties[properties[i]] = "stringToArrayNum";//rules.stringToArrayNum;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "GeoJSON(Point)".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] = "locationCheck";//rules.locationCheck;
      else
        newEntities.properties[properties[i]] =
          "locationCheckNoMand";//rules.locationCheckNoMand;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "Float".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] =
          "commaNumToUnitsMandatory";//rules.commaNumToUnitsMandatory;
      else newEntities.properties[properties[i]] = "commaNumToUnits";//rules.commaNumToUnits;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "Integer".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] =
          "commaNumToUnitsIntMandatory";//rules.commaNumToUnitsIntMandatory;
      else
        newEntities.properties[properties[i]] = "commaNumToUnitsInt";//rules.commaNumToUnitsInt;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "Datetime".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] = "dateCheckMandatory";//rules.dateCheckMandatory;
      else newEntities.properties[properties[i]] = "dateCheck";//rules.dateCheck;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "StructuredValue(JSON object)".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] =
          "structuredValueMandatory";//rules.structuredValueMandatory;
      else newEntities.properties[properties[i]] = "structuredValue";//rules.structuredValue;
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "StructuredList([JSON objects])".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] =
          "structuredListMandatory";//rules.structuredListMandatory;
      else newEntities.properties[properties[i]] = "structuredList";//rules.structuredList;
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
  EnityType.find({ entityType: newType }, function (err, types) { 
    if (types && types.length!=0) { 
      console.log("Entity type " + newType + " already exists in the database");
      sendJSONresponse(res, 400, {
        message: "Entity type " + newType + " already exists in the database",
      });
      return;
    }
    var entity = new EnityType();
    entity.entityType = newType;
    entity.properties = newEntities.properties;

    entity.save(function (err) { 
      if (err) { 
        sendJSONresponse(res, 400, {
          message: "error while saving in the database. Please try later.",
        });
        return;
      }
      sendJSONresponse(res, 200, {
        message: "Entity type: " +
          newType +
          " properly parsed and added to the system.",
        description: typeDescription,
        "New entity": entity
      });
      return;
    });
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
