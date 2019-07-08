const rules = require( "../utilities" );

const Vehicle = {
    id: rules.idCheck,
    type: rules.typeCheck,
    family: rules.mandatoryCheck,
    vehiclePlateIdentifier: rules.mandatoryCheck,
    name: rules.stringCheck,
    location: rules.locationCheckNoMand,
    refType: rules.mandatoryCheck,
    refInputs: rules.stringToArray,
    refOutputs: rules.stringToArray,
    owner: rules.stringCheck,
    category: rules.stringCheck,
    speed: rules.commaNumToUnitsInt,
    cargoWeight: rules.commaNumToUnits,
    purchaseDate: rules.stringCheck,
    mileageFromOdometer: rules.commaNumToUnits,
    vehicleConfiguration: rules.stringCheck,
    color: rules.stringCheck,
    features: rules.stringToArray,
    serviceProvided: rules.stringCheck,
    vehicleSpecialUsage: rules.stringCheck,
    areaServed: rules.stringCheck,
    serviceStatus: rules.stringCheck,
};

module.exports = Vehicle;
