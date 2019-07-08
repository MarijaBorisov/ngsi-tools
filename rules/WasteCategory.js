const rules = require( "../utilities" );

const WasteCategory = {
    "id": rules.idCheck,
    "type": rules.typeCheck,
    "family": rules.mandatoryCheck,
    "name": rules.mandatoryCheck,
    "name:en": rules.stringCheck,
    "name:es": rules.stringCheck,
    "name:it": rules.stringCheck,
    "name:pt": rules.stringCheck,
    "name:eus": rules.stringCheck,
    "name:gr": rules.stringCheck,
    "refResources": rules.stringCheck,
    "description": rules.mandatoryCheck,
    "description:en": rules.stringCheck,
    "description:es": rules.stringCheck,
    "description:it": rules.stringCheck,
    "description:pt": rules.stringCheck,
    "description:eus": rules.stringCheck,
    "description:gr": rules.stringCheck
};

module.exports = WasteCategory;
