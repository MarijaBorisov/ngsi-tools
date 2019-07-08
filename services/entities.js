const request = require( "request-promise" );
const url = require( "../config" ).orion_url;

const entitiesOperations = {

    createEntity: ( data, headers ) => request( {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Fiware-Service": headers[ "fiware-service" ],
            "Fiware-ServicePath": headers[ "fiware-servicepath" ],
            "X-Auth-Token": headers[ "x-auth-token" ],
        },
        uri: `${ url }v2/op/update`,
        body: {
            actionType: "APPEND_STRICT",
            entities: data,
        },
        json: true,
    } ),

  updateEntity: (data, headers) => request({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Fiware-Service': headers['fiware-service'],
      'Fiware-ServicePath': headers['fiware-servicepath'],
      'X-Auth-Token': headers['x-auth-token']
    },
    uri: `${url}v2/op/update`,
    body: {
      actionType: 'UPDATE',
      entities: data,
    },
    json: true,
  }),
};

function processEntities(id, headers) {
  if (!id) {
    return entitiesOperations.getEntities(headers);
  }
  return entitiesOperations.getEntity(id, headers);
}

function processEntitiesByType(type, headers) {
  return entitiesOperations.getEntitiesType(type, headers);
}

async function sendEntities(data, headers, operation) {
  var slicer = 0;
  var allBatches = []
  while (data.length > slicer) {
    let anchor = slicer;
    slicer += 250;
    allBatches.push(
      entitiesOperations.createEntity(data.slice(anchor,slicer), headers)
    );
    console.log(allBatches.length-1);
    allBatches[allBatches.length-1]
  }
  return Promise.all(allBatches)
    .then((x) => {
      return Promise.resolve('Etities created successfuly.')
    })
    .catch((e)=>{
      return Promise.reject(e)
    });
}

async function updateEntities(data, headers) {
  var slicer = 0;
  var allBatches = []
  while (data.length > slicer) {
    let anchor = slicer;
    slicer += 300;
    allBatches.push(
      entitiesOperations.updateEntity(data.slice(anchor,slicer), headers)
    );
    console.log(allBatches.length-1);
    allBatches[allBatches.length-1]
  }
  return Promise.all(allBatches)
    .then((x) => {
      return Promise.resolve(`Entities successfuly updated`)
    })
    .catch((e)=>{
      if (e.statusCode === 404) {
        return Promise.reject(e)
      }
      return Promise.reject(e)
    })
}

module.exports = {
  processEntities,
  sendEntities,
  entitiesOperations,
  processEntitiesByType,
  updateEntities
};
