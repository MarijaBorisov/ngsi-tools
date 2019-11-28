var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  entityType: String,
  properties: {}
}, {
  collection: "entity_types"
});
module.exports = mongoose.model("EntityType", schema);