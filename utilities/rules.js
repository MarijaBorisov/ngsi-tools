const response = require( "../utilities/response" );
const data = require('../services/metadata').get;
const pos = require( "../services/metadata" ).getIgor;
const moment = require( "moment" );

let counter = 0;

function commaNumToUnits( oldNum ) {
    counter += 1;

    if(typeof oldNum === 'object') {
        return {
            "value": oldNum.value,
            "type": "Float",
            "metadata": oldNum.metadata
        }
    }

    const newNum = oldNum ? Number(oldNum.replace('.', '').replace(',', '.')) : 0;
    let obj = [];
    if ( pos( counter ) ) {
        obj = [];
        meta = pos(counter);
        let send =  {
            value: newNum || 0,
            type: "Float",
            metadata: JSON.parse(meta)
        };
        obj.push(send);

    }

    if(obj.length !== 0) {
        return obj[0];
    }

          return {
              "value": newNum || 0,
              "type": "Float"
          };
}

function commaNumToUnitsInt( oldNum ) {
    counter += 1;

    if(typeof oldNum === 'object') {
        return {
            "value": oldNum.value,
            "type": "Integer",
            "metadata": oldNum.metadata
        }
    }

    const newNum = oldNum ? Number(oldNum.replace('.', '').replace(',', '.')) : 0;
    let obj = [];
    if ( pos( counter ) ) {
        obj = [];
        meta = pos(counter);
        let send =  {
            value: newNum || 0,
            type: "Integer",
            metadata: JSON.parse(meta)
        };
        obj.push(send);

    }

    if(obj.length !== 0) {
        return obj[0];
    }

          return {
              "value": newNum || 0,
              "type": "Integer"
          };
}

function commaNumToUnitsMandatory(oldNum) {
    counter += 1;
    if(!oldNum) {
        return null;
    }

    if(typeof oldNum === 'object') {
        return {
            "value": oldNum.value,
            "type": "Float",
            "metadata": oldNum.metadata
        }
    }

    const newNum = oldNum ? Number(oldNum.replace('.', '').replace(',', '.')) : 0;
    let obj = [];
    if(pos(counter)) {
        obj = [];
        meta = pos(counter);
        let send =  {
            value: newNum || 0,
            type: "Float",
            metadata: JSON.parse(meta)
        };
        obj.push(send);
    }

    if(obj.length !== 0) {
        return obj[0];
    }

    return {
        "value": newNum || 0,
        "type": "Float"
    };
}

function stringToArray(string) { 
  if (!string) {
    return {
        value: [],
        type: "List",
        metadata: {}
    };
  }

  if (typeof string === 'object') {
      return {
          value: string.value || [],
          type: "List",
          metadata: string.metadata || {}
      }
  }
  if (string) {
      let obj = [];
      if(pos(counter)) {
          obj = [];
          meta = pos(counter);
          let send =  {
              value: string.split(',').map(raw => raw.trim()),
              type: "List",
              metadata: JSON.parse(meta)
          };
          obj.push(send);

      }

      if(obj.length !== 0) {
          return obj[0];
      }

        return {
            value: string.split(',').map(raw => raw.trim()),
            type: "List",
            metadata: {}
        }
  }
  return null;
}

function stringToArrayMandatory(string) {
    counter += 1;
  if (!string) {
    return null;
  }

  if (typeof string === 'object') {
    return {
        value: string.value || [],
        type: "List",
        metadata: string.metadata || {}
    }
  }

  if (string) {
    let obj = [];
    if(pos(counter)) {
        obj = [];
        meta = pos(counter);
        let send =  {
            value: string.split(',').map(raw => raw.trim()),
            type: "List",
            metadata: JSON.parse(meta)
        };
        obj.push(send);
    }

    if(obj.length !== 0) {
        return obj[0];
    }
      return {
          value: string.split(',').map(raw => raw.trim()),
          type: "List",
          metadata: {}
      }
  }
  return null;
}

function dateCheckMandatory(date) {
  if (!date) {
    return null;
  }
  return {
      value: date,
      type: "DateTime",
      metadata: {}
  };
}

function dateCheck(date) {
    if (!date)
        return {
            value: "",
            type: "String",
            metadata: {}
        }
    return {
        value: date,
        type: "DateTime",
        metadata: {}
    }
}

function mandatoryCheck( attribute ) {
    counter += 1;
    if ( !attribute ) {
        return null;
    }

    if (typeof attribute === 'object') {
        return {
            value: attribute.value,
            type: "String",
            metadata: attribute.metadata,
        };
    }

    const test = attribute.split( "" );
    const forbide = [ "<", ">", "'", ";", "(", ")" ];
    test.forEach( ( element ) => {
        if ( forbide.includes( element ) ) {
            throw "Forbiden char";
        }
    } );
    let obj = [];
    if ( pos( counter ) ) {
        obj = [];
        const meta = pos( counter );
        const send = {
            value: attribute,
            type: "String",
            metadata: JSON.parse( meta ),
        };
        obj.push( send );
    }

    if ( obj.length !== 0 ) {
        return obj[ 0 ];
    }

    return {
        value: attribute,
        type: "String",
        metadata: {},
    };
}

function stringCheck(value) {
    counter += 1;

    if(typeof value === 'object') {
        return {
            "value": value.value,
            "type": "String",
            "metadata": value.metadata
        }
    }

    if(pos(counter)) {
        return  {
            value: value,
            type: "String",
            metadata: JSON.parse(pos(counter))
        };
    }
    return {
        "value": value || "",
        "type": "String",
        "metadata": {}
    }
}

function stringToArrayNum(string) {
    
    counter += 1;
  if (typeof string === 'object') {
    return {
        value: string,
        type: "List",
        metadata: {}
    }
  }

  if (string) {
    let obj = [];
    if(pos(counter)) {
        obj = [];
        meta = pos(counter);
        let send =  {
            value: arrToNum(string),
            type: "List",
            metadata: JSON.parse(meta)
        };
        obj.push(send);
    }

    if(obj.length !== 0) {
        return obj[0];
    }
      return {
          value: arrToNum(string),
          type: "List",
          metadata: {}
      }
  } else {
      obj = [];
        meta = pos(counter);
        let send =  {
            value: [],
            type: "List",
            metadata: JSON.parse(meta) || {}
        };
        obj.push(send);
        if(obj.length !== 0) {
            return obj[0];
        }
    }
  return null;
}

function idCheck(attr) {
    counter = 0;
    counter += 1;
    return attr;
}

function typeCheck(attr) {
    counter += 1;
    return attr;
}

function locationCheck(location) {
    counter += 1;
  if (!location) {
    return null;
  }

  if (typeof location === 'object') {
    return {
        value: location["value"].value,
        type: "geo:json",
        metadata: location["value"].metadata
    }
}

  const data = location.substring(location.indexOf('[') + 1, location.indexOf(']'));
  const coordinates = data.split(',', 2);

  const x = Number(coordinates[0]);
  const y = Number(coordinates[1]);

  if (data.length === 0) {
    return null;
  }
  if (typeof x === 'number' || typeof x === 'number') {
      let obj = [];
      if(pos(counter)) {
          obj = [];
          meta = pos(counter);
          let send =  {
              value: {
                  "type": "Point",
                  "coordinates": [x,y]
              },
              type: "geo:json",
              metadata: JSON.parse(meta)
          };
          obj.push(send);

      }

      if(obj.length !== 0) {
          return obj[0];
      }

    return {
            "value": {
                "type": "Point",
                "coordinates": [x, y]
            },
            "type": "geo:json"
    }
  }
  return null;
}

function locationCheckNoMand(location) {
    counter += 1; 
  if (!location) {
    return {
        value: {},
        type: "geo:json"
    };
  }

  if(typeof location === "object") {
        return {
            value: location["value"].geometry,
            type: "geo:json",
            metadata: location.metadata || {}
        } 
    }

//   if (typeof location === 'object') {
//       return {
//           value: location,
//           type: "geo:json"
//       }
//   }

  const data = location.substring(location.indexOf('[') + 1, location.indexOf(']'));
  const coordinates = data.split(',', 2);
  
  const x = Number(coordinates[0]);
  const y = Number(coordinates[1]);

  if (data.length === 0) {
    return null;
  }
  if (typeof x === 'number' || typeof x === 'number') {
      let obj = [];
      if(pos(counter)) {
          obj = [];
          meta = pos(counter);
          let send =  {
              value: {
                  "type": "Point",
                  "coordinates": [x,y]
              },
              type: "geo:json",
              metadata: JSON.parse(meta)
          };
          obj.push(send);

      }

      if(obj.length !== 0) {
          return obj[0];
      }

      return {
          "value": {
              "type": "Point",
              "coordinates": [x, y]
          },
          "type": "geo:json"
      };
  }



  return null;
}

function extraCheck(data) {
  const result = data.substring(0, data.indexOf(' '));
  return commaNumToUnits(result);
}

function maxCargoVolume(data) {
  const result = data.substring(0, 2);
  return commaNumToUnits(result);
}

function removeForbiden(string) {
  if (!string) {
    return '';
  }
  const data1 = string.replace(/[()]/g, '');
  return data1;
}

function removeForbidenStrict(string) {
  const data1 = string.replace(/[()]/g, '');
  if (!data1 || data1.length === 0) {
    return null;
  }
  return data1;
}

function arrToNum(string) {
    let data = string.split(',').map(raw => raw.trim());

    const result = data.reduce((finalList, string) => {
        let num = string ? Number(string.replace('.', '').replace(',', '.')) : 0;
      finalList.push(num);
      return finalList; 
    },[]);

    return result;
}

function structuredValue(string) {
    counter +=1
    if (typeof string == "object") {
        return {
            "value": string.value || {},
            "type": "StructuredValue",
            "metadata": string.metadata || {}
        }
    }
    return {
        "value": specCase(string) || {},
        "type": "StructuredValue",
        "metadata": {}
    }
}

function structuredValueMandatory(string) {
    counter +=1
    if (!string)
        return null;
    if (typeof string == "object") {
        return {
            "value": string.value || {},
            "type": "StructuredValue",
            "metadata": string.metadata || {}
        }
    }
    return {
        "value": specCase(string) || "",
        "type": "StructuredValue",
        "metadata": {}
    }
}

function structuredListMandatory(string) {
    counter +=1
    if (!string)
        return null;
    if (typeof string == "object") {
        return {
            "value": string.value || {},
            "type": "List",
            "metadata": string.metadata || {}
        }
    }
    return {
        "value": specCase(string) || "",
        "type": "List",
        "metadata": {}
    }
}

function specCase(string) {
    if (!string) {
        return string;
    }
    if (string.includes("[")) {
        let temp = string.substring(1, string.length-1)
        return JSON.parse(temp)
    }
    return JSON.parse(string.substring(1, string.length-1));
}

module.exports = {
    locationCheck,
    commaNumToUnits,
    stringToArray,
    dateCheckMandatory,
    mandatoryCheck,
    extraCheck,
    maxCargoVolume,
    stringToArrayMandatory,
    commaNumToUnitsMandatory,
    removeForbiden,
    removeForbidenStrict,
    locationCheckNoMand,
    stringCheck,
    typeCheck,
    idCheck,
    stringToArrayNum,
    structuredValue,
    structuredValueMandatory,
    dateCheck,
    commaNumToUnitsInt,
    structuredListMandatory
};
