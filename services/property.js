// const entityRules = require("../rules");
const metawrite = require("./metadata").set;
var EntityType = global.conn.model("EntityType");
var rulesFunctions = require("../utilities");
function propertyChecks( rules, entity, operation, ext ) {

    const rulesProp = Object.getOwnPropertyNames( rules );
    const entityProp = Object.getOwnPropertyNames( entity );

    
    const entPropSecond = (rules,entity) => {
        let rulesPr = rules
            .map( rule => rule.toLocaleLowerCase() );
        let entprop = entity
            .map( element => element.toLocaleLowerCase() );

        let metadata = [];

        for (let index = 0; index < rulesPr.length; index++) {
            const element = rulesPr[index];
            if(!entprop.includes(element)) {
                for (let single of entityProp) {
                    if (single.substring(0, single.indexOf("%")).toLowerCase() === element) {
                        let obj = {};
                        const data = single.substring( single.indexOf( "%" ) + 2, single.length - 2 );
                        
                        obj.name = data.substring( data.indexOf( "{" ) );
                        obj.value = 0;
                        obj.test = index + 1;
                        metadata.push(obj);
                    }
                }    
            }
        }
        metawrite( metadata );
        let prop = entprop.map((one) => {
            if (one.includes("%"))
                return one.substring(0, one.indexOf("%"));
            return one;
        })
        return prop;
    }

    const patka = entPropSecond(rulesProp, entityProp);

    const rulesPropLowCase = rulesProp
        .map( rule => rule.toLocaleLowerCase() );
    const entityPropLowCase = patka
        .map( element => element.toLocaleLowerCase() );

    const invalidProp = [];
    const rulesetLowCase = {};

    if ( !operation || operation === "CREATE" ) {
      if (Object.keys(rulesProp).length !== Object.keys(patka).length) {
            throw new Error( "Rules headers and entity headers are not same." );
        }
    }

    rulesPropLowCase.forEach( ( property ) => {
        rulesetLowCase[ property ] = true;
    } );

    entityPropLowCase.forEach( ( property ) => {
        if ( !rulesetLowCase[ property ] ) {
            invalidProp.push( property );
        }
    } );

    if ( invalidProp.length !== 0 ) {
        throw new Error( `Invalid properties found: ${ invalidProp }` );
    }
}

function rulesCheckOld( parsedData, ext ) {

    if (ext === '.json') {
        var { type } = parsedData[0][0]
    } else {
        var { type } = parsedData[ 0 ];
    }

    const rules = entityRules[ type ];
  // console.log("rules");
  // console.log(rules);
    const errors = [];

   
    if ( !type ) {
        return new Error( `Failed to find type on ${ parsedData[ 0 ].id  }` );
    }
    parsedData.forEach( ( element ) => {
        if (ext === '.json') {
            element.forEach((single) => {
                if ( !single.type || single.type !== type ) {
                    errors.push( single.id );
                }
            })
        } else {
            if ( !element.type || element.type !== type ) {
                errors.push( element.id );
            }
        }
    });

    if ( errors.length !== 0 ) {
        throw new Error( `Invalid type attribute on: ${ errors }` );
    }

    if ( !rules ) {
        throw new Error( `No rules have been found for: ${ type }` );
    }

    return rules;
}

async function rulesCheck(parsedData, ext) {
  return new Promise((resolve, reject) => {
    const errors = [];
    var rules = {};
    var props;
    if (ext === '.json') {
      var { type } = parsedData[0][0]
    } else {
      var { type } = parsedData[0];
    }
    if (!type) {
      // return new Error(`Failed to find type on ${parsedData[0].id}`);
      if (ext === '.json')
        return reject(`Failed to find type on ${parsedData[0][0].id}`);
      else
        return reject(`Failed to find type on ${parsedData[0].id}`);
    }

    EntityType.findOne({ entityType: type }, function (err, result) {
      if (err) {
        console.log(err);
        // throw new Error("Error while getting data from database. Please try it later.");
        return reject("Error while getting data from database. Please try it later.");
      }
      if (!result || result.length == 0) {
        //throw new Error("There is no entity type " + type + " in the database. Please add new entity type structure.");
        return reject("There is no entity type " + type + " in the database. Please add new entity type structure.");
      }
      // console.log(result);
      props = Object.keys(result.properties);
      for (var i = 0; i < props.length; i++) {
        rules[props[i]] = rulesFunctions[result.properties[props[i]]];
      }
    
      parsedData.forEach((element) => {
        if (ext === '.json') {
          element.forEach((single) => {
            if (!single.type || single.type !== type) {
              errors.push(single.id);
            }
          })
        } else {
          if (!element.type || element.type !== type) {
            errors.push(element.id);
          }
        }
      });

      if (errors.length !== 0) {
        // throw new Error(`Invalid type attribute on: ${errors}`);
        return reject(`Invalid type attribute on: ${errors}`);
      }

      if (!rules) {
        // throw new Error(`No rules have been found for: ${type}`);
        return reject(`No rules have been found for: ${type}`);
      }

      return resolve(rules);
    });
  });
}

function processEntity( rules, entity, option, ext ) {
    propertyChecks( rules, entity, option, ext );
    const rulesProperties = Object.keys( rules );
    const result = {};
    const warnings = [];
    rulesProperties.forEach( ( property ) => {
        try {
            result[ property ] = processEntityProperty( rules, entity, property, ext );
          if (result[property].warning) { 
            warnings.push(`Property ${property} in ${entity.id} has not had (all) correct data type(s) for (all) value(s). Default value and/or only the values that are correct were saved in the database. Incorrect values were disregarded.`);
            delete result[property].warning;
          }
        } catch ( error ) {
          if (option !== "update") {
            if (error == "Incorrectly structured metadata.") { 
              throw new Error( `Property ${ property } failed attribute check in ${ entity.id }: Incorrectly structured metadata.` );
            } else
                throw new Error( `Property ${ property } failed attribute check in ${ entity.id }` );
          } else if (error.message !== "100") {
            if (error == "Incorrectly structured metadata.") { 
              throw new Error( `Property ${ property } failed attribute check in ${ entity.id }: Incorrectly structured metadata.` );
            } else
                throw new Error( `Property ${ property } failed attribute check in ${ entity.id }` );
            }
        }
    } );
  return { result: result, warnings: warnings };
}

function processEntityProperty( rules, entity, property, ext ) {
    let rule;
    if ( typeof rules[ property ] === "function" ) {
        rule = [ property, rules[ property ] ];
    } else if ( rules[ property ] instanceof Array ) {
        rule = rules[ property ];
    } else {
        throw new Error( `Rules ${ property } rule was not of supported type.` );
    }
    return convertProperties( rule, entity, ext );
}

function convertProperties( array, entity, ext ) {
    const arrayDuplicate = array.slice();
    const rule = arrayDuplicate.pop();
    let mappingFunction;

    mappingFunction = function caseInsensitivePropertyMapping( property ) {
        const caseInsensitiveProperty = findProperty( entity, property );
        if ( caseInsensitiveProperty !== undefined ) {
            return entity[ caseInsensitiveProperty ];
        }
        throw new Error( "100" );
    };

    const args = arrayDuplicate.map(mappingFunction);
    const result = rule( ...args, ext );
    if ( result === null || result === undefined ) {
        throw new Error( `${ mappingFunction } returned null or undefined` );
    }
    return result;
}

function findProperty( target, property ) {
    const targetProperties = Object.getOwnPropertyNames( target );
    const viableProperties = targetProperties.filter( ( targetProperty ) => {
        if ( targetProperty.includes( "%" ) ) {
            const cleanTargetProperty = targetProperty.substring( 0, targetProperty.indexOf( "%" ) );

            return ( property.toLowerCase() === cleanTargetProperty.toLowerCase() );
        }
        return ( property.toLowerCase() === targetProperty.toLowerCase() );
    } );
    return viableProperties[ 0 ];
}

module.exports = {
    rulesCheck,
    processEntity,
};
