const express = require("express");

const router = express.Router();
const {
  entities
} = require("../controllers/");
const {
  upload,
  headermid
} = require("../middlewares");
const rootController = require("../controllers/root");
const url = require("../config").orion_url;

const request = require("request-promise");
const rules = require("../utilities");
var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports = () => {
  router.post("/v1/entities/", headermid, upload.multer, (req, res) => {
    if (req.body.length > 0) {
      entities.postEntitiesBody(req, res, req.body, req.headers, "body");

    } else if (req.files) {
      entities.postEntities(req, res, req.files[0], req.headers);
    }
    else {
      throw new Error(`Please upload a file`);
    }
    
  });

  router.post("/v1/entities/update", headermid, upload.multer, (req, res) => {
    if (req.body.length > 0) {
      entities.updateEntitiesBody(req, res, req.body, req.headers, "body");
    } else {
      entities.updateEntities(req, res, req.files[0], req.headers);
    }
  });

  router.get("/v1/entities", headermid, (req, res) => {
    rootController.getEntities(req, res);
  });

  router.get("/v1/entities/:id", headermid, (req, res) => {
    rootController.getEntity(req, res);
  });

  router.get("/v1/entities/type/:id", headermid, (req, res) => {
    rootController.getEntityByType(req, res);
  });

  router.get("/v1/rules", (req, res) => {
    rootController.getAllTypes(req, res);
  });

  router.get("/v1/rules/:id", (req, res) => {
    rootController.getEntityTypeStructure(req, res);
  });

  router.get("/v1/typestructure", headermid, (req, res) => {
    rootController.getTypeStructure(req, res);
  });

  router.post("/v1/entitytype", headermid, upload.multer, (req, res) => {
    if (req.body) {
      rootController.addEntityType(req, res);
    } else { 
      sendJSONresponse(res, 400, {message: "Please submit non-empty JSON object that represents the structure of an entity type that needs to be uploaded. Follow the correct entity type structure available on: GET /v1/typestructure"});
    }
  });

  router.put("/v1/entitytype", headermid, upload.multer, (req, res) => {
    if (req.body) {
      rootController.updateEntityType(req, res);
    } else { 
      sendJSONresponse(res, 400, { message: "Please submit non-empty JSON object that represents the structure of an entity type that needs to be uploaded. Follow the correct entity type structure available on: GET /v1/typestructure"});
    }
  });

  router.get("/v1/entitytype/:id", headermid, (req, res) => {
    rootController.getEntityType(req, res);
  });

  router.delete("/v1/entitytype/:id", headermid, (req, res) => {
    rootController.deleteEntityType(req, res);
  });

  router.post("/v1/seriousgame", (req, res) => {
    let data = req.body;
    return request({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Fiware-Service": req.headers["fiware-service"],
          "Fiware-ServicePath": req.headers["fiware-servicepath"],
          "X-Auth-Token": req.headers["x-auth-token"],
        },
        uri: `${url}v2/op/update`,
        body: {
          actionType: "append",
          entities: data,
        },
        json: true,
      })
      .then((result) => {
        res.status(200).json()
      })
      .catch((error) => {
        res.json(error)
      })
  });

  return router;
};