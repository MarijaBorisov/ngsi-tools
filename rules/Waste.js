const rules = require( "../utilities" );

const Waste = {
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
    "description": rules.stringCheck,
    "description:en": rules.stringCheck,
    "description:es": rules.stringCheck,
    "description:it": rules.stringCheck,
    "description:pt": rules.stringCheck,
    "description:eus": rules.stringCheck,
    "description:gr": rules.stringCheck,
    "info": rules.stringCheck,
    "info:en": rules.stringCheck,
    "info:es": rules.stringCheck,
    "info:it": rules.stringCheck,
    "info:pt": rules.stringCheck,
    "info:eus": rules.stringCheck,
    "info:gr": rules.stringCheck,
    "important": rules.stringCheck,
    "important:en": rules.stringCheck,
    "important:es": rules.stringCheck,
    "important:it": rules.stringCheck,
    "important:pt": rules.stringCheck,
    "important:eus": rules.stringCheck,
    "important:gr": rules.stringCheck,
    "impact": rules.stringCheck,
    "impact:en": rules.stringCheck,
    "impact:es": rules.stringCheck,
    "impact:it": rules.stringCheck,
    "impact:pt": rules.stringCheck,
    "impact:eus": rules.stringCheck,
    "impact:gr": rules.stringCheck,
    "refCategory": rules.stringToArray,
    "definitionSource": rules.stringCheck,
    "image": rules.stringCheck,
    "wasteCode": rules.stringCheck
};

module.exports = Waste;