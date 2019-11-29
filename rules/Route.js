const rules = require("../utilities");

const Route = {
  id: rules.idCheck,
  type: rules.typeCheck,
  shortName: rules.stringCheck,
  longName: rules.stringCheck,
  description: rules.stringCheck,
  refScheduledVehicle: rules.stringCheck,
  refAssignedVehicle: rules.mandatoryCheck,
  vehicleType: rules.stringCheck,
  departurePoint: rules.structuredValue,
  scheduledDepartureTimestamp: rules.stringCheck,
  realDepartureTimestamp: rules.stringCheck,
  arrivalPoint: rules.structuredValue,
  scheduledArrivalTimestamp: rules.stringCheck,
  realArrivalTimestamp: rules.stringCheck,
  scheduledStops: rules.stringToArray,
  realStops: rules.stringToArray,
  scheduledPath: rules.stringToArray,
  realPath: rules.stringToArray,
  refResourceTypes: rules.stringToArray
};

module.exports = Route;
