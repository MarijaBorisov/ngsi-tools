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
        "Fiware-Service": req.headers["fiware-service"],
        "Fiware-ServicePath": req.headers["fiware-servicepath"],
        "X-Auth-Token": req.headers["x-auth-token"],
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
        res.status(500).json(responseMessages["500"]);
    });
}

function getEntity(req, res) {
  return request({
      method: "GET",
      headers: {
        "Fiware-Service": req.headers["fiware-service"],
        "Fiware-ServicePath": req.headers["fiware-servicepath"],
        "X-Auth-Token": req.headers["x-auth-token"],
      },
      uri: `${ url }v2/entities?id=${ req.params.id }`,
      json: true,
    })
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json(responseMessages["404"]);
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      res.status(responseMessages["500"]).json(error);
    });
}

function getEntityByType(req, res) {
  return request({
      method: "GET",
      headers: {
        "Fiware-Service": req.headers["fiware-service"],
        "Fiware-ServicePath": req.headers["fiware-servicepath"],
        "X-Auth-Token": req.headers["x-auth-token"],
      },
      uri: `${ url }v2/entities?type=${ req.params.id }`,
      json: true,
    })
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json(responseMessages["404"]);
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      res.status(responseMessages["500"]).json(error);
    });
}

function getRules(req, res) {
  if (!responseRules.rules) {
    res.status(404).json(responseMessages["404"]);
  } else {
    res.status(200).json(responseRules.rules);
  }
}

function getRule(req, res) {
  if (!responseRules[req.params.id]) {
    res.status(404).json(responseMessages["404"]);
  } else {
    res.status(200).json(responseRules[req.params.id]);
  }
}

function getTypeStructure(req, res) {
  var path_to_structure = path.normalize(__dirname + "/../extern_types/");
  let rawstructure = fs.readFileSync(path_to_structure + 'example.json');
  let structure = JSON.parse(rawstructure);
  if (!structure) {
    res.status(404).json(responseMessages["404"]);
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
  createEntityTypeObject(res, typeDescription, properties, newEntities, addResEntityType);
}

function updateEntityType(req, res) {
  var bodyObject = req.body;
  var newEntities = {};
  var newType = Object.keys(bodyObject)[0];
  var typeDescription = bodyObject[newType];
  var properties = Object.keys(typeDescription);
  newEntities.entityType = newType;
  newEntities.properties = {};
  createEntityTypeObject(res, typeDescription, properties, newEntities, updateResEntityType);
}

function addResEntityType(err, newEntities, typeDescription, res) {
  if (err) {
    sendJSONresponse(res, 400, {
      message: err
    });
    return;
  }
  // console.log(newEntities);
  EnityType.find({
    entityType: newEntities.entityType
  }, function (err, types) {
    if (types && types.length != 0) {
      console.log("Entity type " + newEntities.entityType + " already exists in the database");
      sendJSONresponse(res, 400, {
        message: "Entity type " + newEntities.entityType + " already exists in the database",
      });
      return;
    }
    var entity = new EnityType();
    entity.entityType = newEntities.entityType;
    entity.properties = newEntities.properties;

    entity.save(function (err) {
      if (err) {
        sendJSONresponse(res, 400, {
          message: "error while saving in the database. Please try it later.",
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

function updateResEntityType(err, newEntities, typeDescription, res) {
  if (err) {
    sendJSONresponse(res, 400, {
      message: err
    });
    return;
  }
  // console.log(newEntities);
  EnityType.find({
    entityType: newEntities.entityType
  }, function (err, types) {
    if (!types || types.length == 0) {
      console.log("Entity type " + newEntities.entityType + " does not exist in the database");
      sendJSONresponse(res, 400, {
        message: "Entity type " + newEntities.entityType + " does not exist in the database",
      });
      return;
    }
    var entity = types[0];
    entity.entityType = newEntities.entityType;
    entity.properties = newEntities.properties;

    EnityType.updateOne({
      entityType: newEntities.entityType
    }, entity, function (err, result) {
      if (err) {
        sendJSONresponse(res, 400, {
          message: "Error while saving changes in the database. Please try it later.",
        });
        return;
      }
      sendJSONresponse(res, 200, {
        message: "Entity type: " +
          entity.entityType +
          " properly parsed and updated.",
        description: typeDescription,
        "Updated entity": entity,
        "result": result
      });
      return;
    });
  });
}

function createEntityTypeObject(res, typeDescription, properties, newEntities, callback) {
  for (let i = 0; i < properties.length; i++) {
    if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "EntityID".toLowerCase()
    ) {
      newEntities.properties["id"] = "idCheck";
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "EntityType".toLowerCase()
    ) {
      newEntities.properties["type"] = "typeCheck";
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
        newEntities.properties[properties[i]] = "mandatoryCheck";
      else newEntities.properties[properties[i]] = "stringCheck";
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
      else newEntities.properties[properties[i]] = "stringToArray";
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
        newEntities.properties[properties[i]] = "stringToArrayNum";
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "GeoJSON(Point)".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] = "locationCheck";
      else
        newEntities.properties[properties[i]] =
        "locationCheckNoMand";
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "Float".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] =
        "commaNumToUnitsMandatory";
      else newEntities.properties[properties[i]] = "commaNumToUnits";
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "Integer".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] =
        "commaNumToUnitsIntMandatory";
      else
        newEntities.properties[properties[i]] = "commaNumToUnitsInt";
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "Datetime".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] = "dateCheckMandatory";
      else newEntities.properties[properties[i]] = "dateCheck";
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "StructuredValue(JSON object)".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] =
        "structuredValueMandatory";
      else newEntities.properties[properties[i]] = "structuredValue";
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "StructuredList([JSON objects])".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] =
        "structuredListMandatory";
      else newEntities.properties[properties[i]] = "structuredList";
    } else {
      if (callback)
        callback("Unknown property type exists: " + properties[i] + ", please check the structure", newEntities, typeDescription, res);
      console.log("Unknown property type exists: " + properties[i] + ", please check the structure");
      return;
    }
  }
  if (callback)
    callback(null, newEntities, typeDescription, res);
  return;
}

module.exports = {
  getEntityByType,
  getEntities,
  getEntity,
  getRules,
  getRule,
  getTypeStructure,
  addEntityType,
  updateEntityType
};