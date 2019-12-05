const request = require("request-promise");
const fs = require('fs');
var path = require('path');
var path_to_structure = path.normalize(__dirname + "/../extern_types/");
const responseMessages = require("../utilities/utils");
// const responseRules = require("../utilities/rules.json");
const url = require("../config").orion_url;
const defaultEntitiesAmount = require("../config").returnEntities;
const rules = require("../utilities");
var EntityType = global.conn.model("EntityType");

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

// function getRules(req, res) {
//   if (!responseRules.rules) {
//     res.status(404).json(responseMessages["404"]);
//   } else {
//     res.status(200).json(responseRules.rules);
//   }
// }

function getAllTypes(req, res) {
  EntityType.distinct("entityType", {},
    function (err, result) {
      if (err) {
        sendJSONresponse(res, 500, {
          "message": "Error while querying database, please try later"
        });
        return;
      }

      if (!result || result.length == 0) {
        sendJSONresponse(res, 200, {
          "message": "There is no Rules, no Entity Type structeres inserted into the database"
        });
        return;
      }
      res.status(200).json(result);
      return;
    });
}

// function getRule(req, res) {
//   if (!responseRules[req.params.id]) {
//     res.status(404).json(responseMessages["404"]);
//   } else {
//     res.status(200).json(responseRules[req.params.id]);
//   }
// }

function getEntityTypeStructureFiles(req, res) {
  if (!req.params.id) {
    sendJSONresponse(res, 400, {
      "message": "Bad Request, mising RuleId"
    });
    return;
  }
  let rawstructure;
  try {
    rawstructure = fs.readFileSync(path_to_structure + req.params.id + '.json');
  } catch (err) {
    sendJSONresponse(res, 404, {
      "message": "There is no Rule for Entity Type: " + req.params.id
    });
    return;
  }
  if (!rawstructure) {
    sendJSONresponse(res, 404, {
      "message": "There is no Rule for Entity Type: " + req.params.id
    });
    return;
  }
  let structure = JSON.parse(rawstructure);
  if (!structure) {
    res.status(404).json(responseMessages["404"]);
  } else {
    res.status(200).json(structure);
  }
}

function getEntityTypeStructure(req, res) {
  if (!req.params.id) {
    sendJSONresponse(res, 400, {
      "message": "Bad Request, mising RuleId"
    });
    return;
  }
  EntityType.findOne({
      entityType: req.params.id
    },
    function (err, result) {
      if (err) {
        sendJSONresponse(res, 500, {
          "message": "Error while querying database. Please try later."
        });
        return;
      }
      if (!result) {
        sendJSONresponse(res, 404, {
          "message": "There is no Rule for Entity Type: " + req.params.id + " stored in the system."
        });
        return;
      }
      if (result.structure_description && !isEmpty(result.structure_description)) {
        res.status(200).json(result.structure_description);
      } else { 
        sendJSONresponse(res, 404, {
          "message": "There is no Rule for Entity Type: " + req.params.id + " stored in the system."
        });
        return;
      }
    });
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

function getEntityType(req, res) {
  if (!req.params.id) {
    sendJSONresponse(res, 400, {
      "message": "Bad Request"
    });
    return;
  }
  EntityType.findOne({
      entityType: req.params.id
    },
    function (err, result) {
      if (err) {
        sendJSONresponse(res, 500, {
          "message": "Error while quering database. Please try again."
        });
        return;
      }
      if (!result) {
        sendJSONresponse(res, 404, {
          "message": "There is no entity type " + req.params.id + " in the database. Please add its structure first."
        });
        return;
      }
      sendJSONresponse(res, 200, {
        "Entity type:": {
          entityType: result.entityType,
          properties: result.properties
        }
      });
      return;
    });
}

function addEntityType(req, res) {
  if (!req.body || isEmpty(req.body)) {
    sendJSONresponse(res, 400, {
      "message": "Please submit non-empty JSON object that represents the structure of an entity type that needs to be uploaded. Follow the correct entity type structure available on /v1/typestructure"
    });
    return;
  }
  var bodyObject = req.body;
  var newEntities = {};
  var newType = Object.keys(bodyObject)[0];
  var typeDescription = bodyObject[newType];
  var properties = Object.keys(typeDescription);
  if (!newType || !properties || properties.length < 2) {
    sendJSONresponse(res, 400, {
      "message": "Please submit non-empty JSON object that represents the structure of an entity type that needs to be uploaded. Follow the correct entity type structure available on /v1/typestructure"
    });
    return;
  }
  newEntities.entityType = newType;
  newEntities.properties = {};
  createEntityTypeObject(res, typeDescription, properties, newEntities, bodyObject, addResEntityType);
}

function updateEntityType(req, res) {
  if (!req.body || isEmpty(req.body)) {
    sendJSONresponse(res, 400, {
      "message": "Please submit non-empty JSON object that represents the structure of an entity type that needs to be uploaded. Follow the correct entity type structure available on /v1/typestructure"
    });
    return;
  }
  var bodyObject = req.body;
  var newEntities = {};
  var newType = Object.keys(bodyObject)[0];
  var typeDescription = bodyObject[newType];
  var properties = Object.keys(typeDescription);
  if (!newType || !properties || properties.length < 2) {
    sendJSONresponse(res, 400, {
      "message": "Please submit non-empty JSON object that represents the structure of an entity type that needs to be uploaded. Follow the correct entity type structure available on /v1/typestructure"
    });
    return;
  }
  newEntities.entityType = newType;
  newEntities.properties = {};
  createEntityTypeObject(res, typeDescription, properties, newEntities, bodyObject, updateResEntityType);
}

function addResEntityType(err, newEntities, typeDescription, bodyObject, res) {
  if (err) {
    sendJSONresponse(res, 400, {
      message: "Error while saving in the database. Please try it later."
    });
    return;
  }

  EntityType.find({
    entityType: newEntities.entityType
  }, function (err, types) {
    if (types && types.length != 0) {
      console.log("Entity type " + newEntities.entityType + " already exists in the database");
      sendJSONresponse(res, 404, {
        message: "Entity type " + newEntities.entityType + " already exists in the database",
      });
      return;
    }
    var entity = new EntityType();
    entity.entityType = newEntities.entityType;
    entity.properties = newEntities.properties;
    entity.structure_description= {};
    entity.structure_description[newEntities.entityType] = typeDescription;


    entity.save(function (err) {
      if (err) {
        sendJSONresponse(res, 500, {
          message: "Error while saving in the database. Please try it later.",
        });
        return;
      }
      sendJSONresponse(res, 200, {
        message: "Entity type: " +
          newEntities.entityType +
          " properly parsed and added to the system.",
        description: typeDescription,
        "New entity": entity
      });
      return;
    });
  });
}

function updateResEntityType(err, newEntities, typeDescription, bodyObject, res) {
  if (err) {
    sendJSONresponse(res, 400, {
      message: err
    });
    return;
  }

  EntityType.find({
    entityType: newEntities.entityType
  }, function (err, types) {
    if (err) {
      sendJSONresponse(res, 500, {
        message: "Error while querying the database. Please try it later.",
      });
      return;
    }
    if (!types || types.length == 0) {
      console.log("Entity type " + newEntities.entityType + " does not exist in the database");
      sendJSONresponse(res, 404, {
        message: "Entity type " + newEntities.entityType + " does not exist in the database",
      });
      return;
    }
    var entity = types[0];
    entity.entityType = newEntities.entityType;
    entity.properties = newEntities.properties;
    entity.structure_description = {};
    entity.structure_description[newEntities.entityType] = typeDescription;
      
    EntityType.updateOne({
      entityType: newEntities.entityType
    }, entity, function (err, result) {
      if (err) {
        sendJSONresponse(res, 500, {
          message: "Error while querying the database. Please try it later.",
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

function createEntityTypeObject(res, typeDescription, properties, newEntities, bodyObject, callback) {
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
      "ReferenceID".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] = "mandatoryCheck";
      else newEntities.properties[properties[i]] = "stringCheck";
    } else if (
      typeDescription[properties[i]].type.toLowerCase() ==
      "TextList(,)".toLowerCase()||
      typeDescription[properties[i]].type.toLowerCase() ==
      "ReferenceIDList(,)".toLowerCase()
    ) {
      if (
        typeDescription[properties[i]].mandatory.toLowerCase() ==
        "YES".toLowerCase()
      )
        newEntities.properties[properties[i]] =
        "stringToArrayMandatory";
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
        "stringToArrayNumMandatory";
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
        callback("Unknown property type exists: " + properties[i] + ", please check the structure", newEntities, typeDescription, bodyObject, res);
      console.log("Unknown property type exists: " + properties[i] + ", please check the structure");
      return;
    }
  }
  if (callback)
    callback(null, newEntities, typeDescription, bodyObject, res);
  return;
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

module.exports = {
  getEntityByType,
  getEntities,
  getEntity,
  // getRules,
  // getRule,
  getTypeStructure,
  addEntityType,
  updateEntityType,
  getEntityType,
  getEntityTypeStructure,
  getAllTypes
};