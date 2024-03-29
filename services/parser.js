const csv = require( "csvtojson" );
const ruleChecks = require( "../services/property" ).rulesCheck;
const { processEntity } = require( "./property" );

const parseOperations = {

    getData: rawData => csv( { delimiter: ";" } ).fromString( rawData ),

    getRules: async (parsedData, ext) => {
        let rules;
        try {
          rules = await ruleChecks(parsedData, ext);
          return Promise.resolve( rules );
        } catch (error) {
          return Promise.reject( error );
        }
    },

    getEntity: ( rules, parsedData, option, ext ) => {
        if (ext === '.json') {
            const result = [];
            const errors = [];
            let warnings = [];
            let ent;
            parsedData[0].forEach( ( entity ) => {
            try {
              ent = processEntity(rules, entity, option, ext);
              if (ent.warnings && ent.warnings.length != 0) { 
                warnings = warnings.concat(ent.warnings);
              }
              result.push(ent.result);
            } catch ( error ) {
                errors.push( error.message );
            }
        } );
        return Promise.resolve({ errors, res: { result: result, warnings: warnings } });
        } else {
            const result = [];
            const errors = [];
            let warnings = [];
            let ent;
            parsedData.forEach( ( entity ) => {
              try {
                ent = processEntity(rules, entity, option, ext);
                if (ent.warnings && ent.warnings.length != 0) { 
                  warnings = warnings.concat(ent.warnings);
                }
                result.push(ent.result);
            } catch ( error ) {
                errors.push( error.message );
            }
        } );
          return Promise.resolve({ errors, res: { result: result, warnings: warnings } } );
        }
        
    },
};

function parse( rawData, option, fileType ) {
    if ( fileType === "body") {
        return parseOperations.getRules( rawData, 'body' )
            .then( rules => parseOperations.getEntity( rules, rawData, option, 'body' ) )
            .then(checkedData => {
              return Promise.resolve({ result: checkedData.res.result, warnings: checkedData.res.warnings, errors: checkedData.errors });
            })
            .catch( error => Promise.reject( error ) );
    }
    if ( fileType === ".json" ) {
        const data = [];
        data.push( JSON.parse( rawData ) );
        return parseOperations.getRules( data, '.json' )
            .then( rules => parseOperations.getEntity( rules, data, option, '.json' ) )
            .then(checkedData => {
              return Promise.resolve({ result: checkedData.res.result, warnings: checkedData.res.warnings, errors: checkedData.errors });
            })
            .catch( error => Promise.reject( error ) );
    }
    if (fileType === ".csv") {
        return parseOperations.getData( rawData )
        .then( parsedData => parseOperations.getRules( parsedData, '.csv' )
            .then( rules => parseOperations.getEntity( rules, parsedData, option, '.csv' )
              .then(checkedData => {
                return Promise.resolve({ result: checkedData.res.result, warnings: checkedData.res.warnings, errors: checkedData.errors });
              })))
        .catch( error => Promise.reject( error ) );
    }
}

module.exports = {
    parse,
};
