const rules = require( "../utilities" );

const TargetGroup = {
  id: rules.idCheck,
  type: rules.typeCheck,
  name: rules.mandatoryCheck,
  acronym: rules.mandatoryCheck,
  description: rules.stringCheck
};

module.exports = TargetGroup;