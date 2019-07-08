const rules = require( "../utilities" );

const WasteManagementStage = {
  id: rules.idCheck,
  type: rules.typeCheck,
  name: rules.mandatoryCheck
};

module.exports = WasteManagementStage;