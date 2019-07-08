const rules = require( "../utilities" );

const SortingType = {
    "id": rules.idCheck,
    "family": rules.mandatoryCheck,
    "type": rules.typeCheck,
    "name": rules.mandatoryCheck,
    "name:en": rules.stringCheck,
    "name:es": rules.stringCheck,
    "name:it": rules.stringCheck,
    "name:pt": rules.stringCheck,
    "name:eus": rules.stringCheck,
    "name:gr": rules.stringCheck,
    "description": rules.stringCheck,
    "description:en": rules.stringCheck,
    "description:es": rules.stringCheck,
    "description:it": rules.stringCheck,
    "description:pt": rules.stringCheck,
    "description:eus": rules.stringCheck,
    "description:gr": rules.stringCheck,
    "regulation": rules.stringCheck,
    "refResources": rules.stringToArrayMandatory,
    "shape": rules.stringCheck,
    "color": rules.mandatoryCheck,
    "annotations": rules.stringCheck,
    "wasteCharacterization": rules.structuredValue,
    "wasteCharacterizationTime": rules.stringCheck,
    "areaServed": rules.stringCheck,
};

module.exports = SortingType;
