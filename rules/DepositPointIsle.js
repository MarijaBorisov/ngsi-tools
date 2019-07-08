const rules = require("../utilities");

const DepositPointIsle = {
  id: rules.idCheck,
  type: rules.typeCheck,
  location: rules.locationCheck,
  address: rules.stringCheck,
  name: rules.stringCheck,
  description: rules.stringCheck,
  features: rules.stringToArrayMandatory,
  refDepositPoint: rules.stringToArrayMandatory,
  areaServed: rules.stringCheck,
  dateModified: rules.stringCheck,
  dateCreated: rules.stringCheck,
};
module.exports = DepositPointIsle;
