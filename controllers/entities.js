const {
  entities, codeCheck, fileCheck, parser,
} = require("../services/");
const path = require("path");

const resp = require("../utilities/response").resposneResult;

const entitiesOperation = {
  errorHandle: (res, code) => {
    res.status(code).end(codeCheck(code));
  },
};

function postEntities(req, res, file, headers) {
  const ext = path.extname(file.originalname);
  fileCheck(file, (err) => {
    if (err) {
      entitiesOperation.errorHandle(res, err);
    }
  });

  return parser.parse(file.buffer.toString(), null, ext)
  .then((data) => {
    entities.sendEntities(data.result, headers)
    .then(() => {
      res.json([
        {
          "Entity attribute errors:": data.errors.length,
          "Entities without errors:": data.result.length,
          "Info on rules for given type:": typet(data.result),
        },
        data.errors,
        resp(data.result, "Create"),
      ]);
    })
      .catch((error) => {
        if (error.statusCode === 422) {
          res.json(`Duplicate entities where detected in creation operations, 
            NGSI Connector API successfuly created all entities that where not already in Fiware Orion`);
        }
        else if (error.statusCode === 401) {
          res.status(401).json(error.error);
        } else {
          res.json(error);
        }
      });
  })
    .catch((error) => {
      res.json(error);
    });
  };

function postEntitiesBody(req, res, file, headers, body) {
  return parser.parse(file, null, "body")
  .then((data) => {
    entities.sendEntities(data.result, headers)
    .then(() => {
      res.json([
        {
          "Entity attribute errors:": data.errors.length,
          "Entities without errors:": data.result.length,
          "Info on rules for given type:": typet(data.result),
        },
        data.errors,
        resp(data.result, "Create"),
      ]);
    })
      .catch((error) => {
        if (error.statusCode === 401) {
          res.status(401).json(error.error);
        } 
        else res.json([
          {
            "Entity attribute errors:": data.errors.length,
            "Entities without errors:": data.result.length,
            "Info on rules for given type:": typet(data.result),
          },
          data.errors,
          resp(data.result, "Create"),
        ]);
      });
  })
    .catch((error) => {
      res.json([
        {
          "Entity attribute errors:": data.errors.length,
          "Entities without errors:": data.result.length,
          "Info on rules for given type:": typet(data.result),
        },
        data.errors,
        resp(data.result, "Create"),
      ]);
    });
}

function updateEntitiesBody(req, res, file, headers, body) {
  return parser.parse(file, "update", "body")
  .then((data) => {
    entities.sendEntities(data.result, headers)
    .then(() => {
      res.json([
        {
          "Entity attribute errors:": data.errors.length,
          "Entities without errors:": data.result.length,
          "Info on rules for given type:": typet(data.result),
        },
        data.errors,
        resp(data.result, "Create"),
      ]);
    })
      .catch((error) => {
        if (error.statusCode === 401) {
          res.status(401).json(error.error);
        }
         res.json(error);
      });
  })
    .catch((error) => {
      res.json(error);
    });
}



function updateEntities(req, res, file, headers) {
  const ext = path.extname(file.originalname);
  fileCheck(file, (err) => {
    if (err) {
      entitiesOperation.errorHandle(res, err);
    }
  });

  return parser.parse(file.buffer.toString(), "update", ext)
    .then((data) => {
      entities.updateEntities(data.result, headers)
        .then(() => {
          res.json([
            {
              "Entity attribute errors:": data.errors.length,
              "Entities updated:": data.result.length,
              "Info on rules for given type:": typet(data.result),
            },
            data.errors,
            resp(data.result, "Update"),
          ]);
        })
        .catch((error) => {
          res.json(error);
        });
    })
    .catch((error) => {
      res.json(error);
    });
}

function typet(data) {
  if (data.length === 0) {
    return "v1/rules/unknown";
  }
  return `v1/rules/${ data[ 0 ].type }`;
}

module.exports = {
  postEntities,
  updateEntities,
  postEntitiesBody,
  updateEntitiesBody
};
