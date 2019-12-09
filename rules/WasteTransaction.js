const rules = require( "../utilities" );

const WasteTransaction = {
    id: rules.idCheck,
    type: rules.typeCheck,
    family: rules.stringCheck,
    refEmitter: rules.mandatoryCheck,
    refReceiver: rules.mandatoryCheck,
    refCapturer: rules.stringCheck,
    date: rules.mandatoryCheck,
    emittedResources: rules.stringToArrayMandatory,//rules.structuredListMandatory,
    receivedResources: rules.stringToArrayMandatory,//rules.structuredListMandatory,
    incidence: rules.stringCheck,
    incidenceReason: rules.stringCheck
};

module.exports = WasteTransaction;
