const rules = require( "../utilities" );

const VehicleType = {
    id: rules.idCheck,
    type: rules.typeCheck,
    family: rules.mandatoryCheck,
    refInputs: rules.stringToArray,
    refOutputs: rules.stringToArray,
    name: rules.mandatoryCheck,
    description: rules.stringCheck,
    vehicleType: rules.mandatoryCheck,
    brandName: rules.mandatoryCheck,
    numberOfAxes: rules.commaNumToUnitsInt,
    maxCargoPerAxe: rules.stringToArrayNum,
    engineType: rules.stringCheck,
    enginePower: rules.commaNumToUnits,
    tireTypes: rules.stringCheck,
    modelName: rules.stringCheck,
    manufacturerName: rules.stringCheck,
    vehicleModelDate: rules.stringCheck,
    maxCargoWeight: rules.commaNumToUnits,
    maxCargoVolume: rules.commaNumToUnits,
    fuelDepositCapacity: rules.commaNumToUnits,
    compactingRatio: rules.commaNumToUnits,
    fuelType: rules.stringCheck,
    fuelConsumption: rules.commaNumToUnits,
    height: rules.commaNumToUnits,
    width: rules.commaNumToUnits,
    depth: rules.commaNumToUnits,
    weight: rules.commaNumToUnits,
    loadType: rules.stringCheck,
};

module.exports = VehicleType;
