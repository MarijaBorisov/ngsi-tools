const response = require( "../utilities/response" );
const data = require('../services/metadata').get;
const pos = require( "../services/metadata" ).getIgor;
const moment = require( "moment" );

let counter = 0;

function commaNumToUnits( oldNum ) {//OK Float Optional
    counter += 1;

    if(typeof oldNum === 'object') {
        return {
            "value": Number(oldNum.value) || 0,
            "type": "Float",
            "metadata": oldNum.metadata || {}
        }
    }

  // const newNum = oldNum ? Number(oldNum.replace('.', '').replace(',', '.')) : 0;
  const newNum = Number(oldNum) ? Number(oldNum) : 0;
  let obj = [];
  let meta = pos(counter);
    if ( meta ) {
        obj = [];
        // meta = pos(counter);
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
            "type": "Float",
            metadata: {}
          };
}

function commaNumToUnitsInt( oldNum ) {//OK Opional Integer
    counter += 1;

    if(typeof oldNum === 'object') {
        return {
            "value": Number(oldNum.value) || 0,
            "type": "Integer",
          "metadata": oldNum.metadata || {}
        }
    }

    // const newNum = oldNum ? Number(oldNum.replace('.', '').replace(',', '.')) : 0;
    const newNum = Number(oldNum) ? Number(oldNum) : 0;
  let obj = [];
  let meta = pos(counter);
  // console.log( meta);
    if ( meta ) {
        obj = [];
        // meta = pos(counter);
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
            "type": "Integer",
            metadata: {}
          };
}

function commaNumToUnitsIntMandatory(oldNum) {//OK Mandatory Integer
  counter += 1;

  if (!oldNum) {
    return null;
  }
  
  if (typeof oldNum === "object") {
    return {
      value: Number(oldNum.value) || 0,
      type: "Integer",
      metadata: oldNum.metadata || {}
    };
  }

  // const newNum = oldNum ? Number(oldNum.replace(".", "").replace(",", ".")) : 0;
  const newNum = Number(oldNum) ? Number(oldNum) : 0;
  let obj = [];
  let meta = pos(counter);
  if (meta) {
    obj = [];
    // meta = pos(counter);
    let send = {
      value: newNum || 0,
      type: "Integer",
      metadata: JSON.parse(meta)
    };
    obj.push(send);
  }

  if (obj.length !== 0) {
    return obj[0];
  }

  return {
    value: newNum || 0,
    type: "Integer",
    metadata: {}
  };
}

function commaNumToUnitsMandatory(oldNum) {//OK Mandatory Float
    counter += 1;
    if(!oldNum) {
        return null;
    }

    if(typeof oldNum === 'object') {
        return {
            "value": Number(oldNum.value) || 0,
            "type": "Float",
            "metadata": oldNum.metadata || {}
        }
    }

    // const newNum = oldNum ? Number(oldNum.replace('.', '').replace(',', '.')) : 0;
  const newNum = Number(oldNum) ? Number(oldNum) : 0;
  let obj = [];
  let meta = pos(counter);
    if(meta) {
        obj = [];
        // meta = pos(counter);
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
      "type": "Float",
      metadata: {}
    };
}

// function stringToArray(string) {
//   counter += 1;
//   if (!string) {
//     return {
//         value: [],
//         type: "List",
//         metadata: {}
//     };
//   }

//   if (typeof string === 'object') {
//       return {
//           value: string.value || [],
//           type: "List",
//           metadata: string.metadata || {}
//       }
//   }
//   if (string) {
//       let obj = [];
//       if(pos(counter)) {
//           obj = [];
//           meta = pos(counter);
//           let send =  {
//               value: string.split(',').map(raw => raw.trim()),
//               type: "List",
//               metadata: JSON.parse(meta)
//           };
//           obj.push(send);

//       }

//       if(obj.length !== 0) {
//           return obj[0];
//       }

//         return {
//             value: string.split(',').map(raw => raw.trim()),
//             type: "List",
//             metadata: {}
//         }
//   }
//   return null;
// }

function stringToArray(string) {//OK Optional List Float or String
  counter += 1;

  if (typeof string === "object") {
    return {
      value: string.value || [],
      type: "List",
      metadata: string.metadata || {}
    };
  }
  let obj = [];
  let meta = pos(counter);
  if (meta) {
    obj = [];
    // meta = pos(counter);
    let send = {
      value: string ? string.split(",").map(raw => raw.trim()) : [],
      type: "List",
      metadata: JSON.parse(meta)
    };
    obj.push(send);
  }

  if (obj.length !== 0) {
    return obj[0];
  }

  return {
    value: string ? string.split(",").map(raw => raw.trim()) : [],
    type: "List",
    metadata: {}
  };
}

function stringToArrayMandatory(string) {//OK Mandatory List Float or String
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
    let meta = pos(counter);
    if(meta) {
        obj = [];
        // meta = pos(counter);
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

function dateCheckMandatory(date) {// Not in use
  counter += 1;
  if (!date) {
    return null;
  }
  //Missing objest check!!!
  return {
      value: date,
      type: "DateTime",
      metadata: {}
  };
}

// function dateCheckMandatory(string) {
//   counter += 1;
//   if (!string) {
//     return null;
//   }
//   if (typeof string === "object") {
//     return {
//       value: string.value || "",
//       type: "DateTime",
//       metadata: string.metadata || {}
//     };
//   }
// //console.log(!(new Date("2019/09/09"))||new Date("2019/09/09x")=="Invalid Date"? "false":"true");
//   if (string) {
//     let obj = [];
//     if (pos(counter)) {
//       obj = [];
//       meta = pos(counter);
//       let send = {
//         value: new Date(string).toISOString(),
//         type: "DateTime",
//         metadata: JSON.parse(meta)
//       };
//       obj.push(send);
//     }

//     if (obj.length !== 0) {
//       return obj[0];
//     }
//     return {
//       value: string,
//       type: "DateTime",
//       metadata: {}
//     };
//   }
//   return null;
// }

function dateCheck(date) {// not in use
    counter += 1;
    if (!date)
        return {
            value: "",
            type: "String",
            metadata: {}
    }
  //missing object check!!
    return {
        value: date,
        type: "DateTime",
        metadata: {}
    }
}


function mandatoryCheck( attribute ) {//OK Mandatory String
    counter += 1;
    if ( !attribute ) {
        return null;
    }

    if (typeof attribute === 'object') {
        return {
            value: attribute.value || "",
            type: "String",
            metadata: attribute.metadata || {},
        };
    }

    const test = attribute.split( "" );
    const forbide = [ "<", ">", "'", ";", "(", ")" ];
    test.forEach( ( element ) => {
        if ( forbide.includes( element ) ) {
            throw "Forbidden character";
        }
    } );
  let obj = [];
  let meta = pos( counter );
    if ( meta ) {
        obj = [];
        // const meta = pos( counter );
        const send = {
            value: attribute || "",
            type: "String",
            metadata: JSON.parse( meta ),
        };
        obj.push( send );
    }

    if ( obj.length !== 0 ) {
        return obj[ 0 ];
    }

    return {
        value: attribute || "",
        type: "String",
        metadata: {},
    };
}


function stringCheck(value) {//OK Optional String
    counter += 1;

    if(typeof value === 'object') {
        return {
            "value": value.value || "",
            "type": "String",
            "metadata": value.metadata || {}
        }
    }

    let meta = pos( counter );
    if(meta) {
        return  {
            value: value || "", //
            type: "String",
            metadata: JSON.parse(meta)
        };
    }
    return {
        "value": value || "",
        "type": "String",
        "metadata": {}
    }
}

function stringToArrayNum(string) {//OK Optional List<Float>
    counter += 1;
  if (typeof string === 'object') {
    return {
        value: string.value || [],//string,////
        type: "List",
        metadata: string.metadata || {}//{}////
    }
  }

  if (string) {
    let obj = [];
    let meta = pos( counter );
    if(meta) {
        obj = [];
        // meta = pos(counter);
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
    let meta = pos(counter);
        let send =  {
            value: [],
            type: "List",
            metadata: meta? JSON.parse(meta) : {}
        };
    obj.push(send);
    if (obj.length !== 0) {
            return obj[0];
        }
    }
  return null;
}

function stringToArrayNumMandatory(string) {//OK Mandatory List<Float>
  counter += 1;
  if (!string) {
    return null;
  }
  
  if (typeof string === "object") {
    return {
      value: string.value || [],//string //
      type: "List",
      metadata: string.metadata || {}//{}
    };
  }

  if (string) {
    let obj = [];
    let meta = pos(counter);
    if (meta) {
      obj = [];
      // meta = pos(counter);
      let send = {
        value: arrToNum(string),
        type: "List",
        metadata: JSON.parse(meta)
      };
      obj.push(send);
    }

    if (obj.length !== 0) {
      return obj[0];
    }
    return {
      value: arrToNum(string),
      type: "List",
      metadata: {}
    };
  } else {
    obj = [];
    let meta = pos(counter);
    let send = {
      value: [],
      type: "List",
      metadata: meta? JSON.parse(meta) : {}
    };
    obj.push(send);
    if (obj.length !== 0) {
      return obj[0];
    }
  }
  return null;
}

function idCheck(attr) {//OK ID
    counter = 0;
    counter += 1;
    return attr;
}

function typeCheck(attr) {//OK type
    counter += 1;
    return attr;
}

function locationCheck(location) {//OK Mandatory geo:json
    counter += 1;
  if (!location) {
    return null;
  }

  if (typeof location === 'object') {
    return {
        // value: location["value"].value,
        // type: "geo:json",
        // metadata: location["value"].metadata
        value: location.value || {},
        type: "geo:json",
        metadata: location.metadata || {}
    }
}

  const data = location.substring(location.indexOf('[') + 1, location.indexOf(']'));
  const coordinates = data.split(',', 2);

  const x = Number(coordinates[0]);
  const y = Number(coordinates[1]);

  if (data.length === 0) {
    return null;
  }
  if (!isNaN(x) && typeof x === 'number' && !isNaN(y) && typeof y === 'number') { // x || x
    let obj = [];
    let meta = pos(counter);
      if(meta) {
          obj = [];
          // meta = pos(counter);
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
            "type": "geo:json",
            "metadata": {}
    }
  }
  return null;
}

function locationCheckNoMand(location) {// Optional geo:json
  counter += 1; 

  if(typeof location === "object") {
        return {
            // value: location["value"].geometry,
            // type: "geo:json",
            // metadata: location.metadata || {}
            value: location.value || {},
            type: "geo:json",
            metadata: location.metadata || {}
        } 
  }

  const data = location ? location.substring(location.indexOf('[') + 1, location.indexOf(']')) : "";
  const coordinates = data? data.split(',', 2) : [];

  let meta = pos(counter);
  if (!data || data.length === 0 || coordinates.length < 2) {
    return {
        value: {},
        type: "geo:json",
        metadata: meta? JSON.parse(meta):{}
    };
  }
  const x = Number(coordinates[0]);
  const y = Number(coordinates[1]);
  if (!isNaN(x) && typeof x === 'number' && !isNaN(y) && typeof y === 'number') {
    let obj = [];
    // meta = pos(counter);
      if(meta) {
          obj = [];
          // meta = pos(counter);
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
          "type": "geo:json",
          metadata: {}
      };
  }

  // return null;
  return {
    value: {},
    type: "geo:json",
    metadata: meta? JSON.parse(meta):{}
  };
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

function arrToNumOld(string) {
    let data = string.split(',').map(raw => raw.trim());

    const result = data.reduce((finalList, string) => {
        let num = string ? Number(string.replace('.', '').replace(',', '.')) : 0;
      finalList.push(num);
      return finalList; 
    },[]);

    return result;
}

function arrToNum(string) {
  let data = string? string.split(',').map(raw => Number(raw.trim())):[];
  return data;
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
  
  let meta = pos(counter);
  var string_obj;
  if (IsJsonString(string)) {
    string_obj = JSON.parse(decodeURIComponent(string));
    string_obj = urlEncodeForbiddenObj(string_obj);
  } else { 
    string_obj = string;
  }
  
  if(meta) {
      return  {
        "value": string_obj || {},// specCase(string) || {},
        "type": "StructuredValue",
        metadata: JSON.parse(meta)
      };
  }
  return {
    "value": string_obj || {},// specCase(string) || {},
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
    let meta = pos(counter);
    var string_obj;
    if (IsJsonString(string)) {
      string_obj = JSON.parse(decodeURIComponent(string));
      string_obj = urlEncodeForbiddenObj(string_obj);
    } else { 
      string_obj = string;
    }
    return {
        "value": string_obj,//specCase(string) || "",
        "type": "StructuredValue",
        "metadata": meta? JSON.parse(meta) : {}
    }
}

function structuredListMandatory(string) {
    counter +=1
    if (!string)
        return null;
    if (typeof string == "object") {
        return {
            "value": string.value || [],//{},
            "type": "List",
            "metadata": string.metadata || {}
        }
  }
  let meta = pos(counter);
  let array=[];
  if (string.includes("[")) {
    string = string.substring(1, string.length-1)
  } 

  while (string.indexOf("},{") > -1) { 
    array.push(string.substring(0, string.indexOf("},{") + 1));
    string=substring(string.indexOf("},{") + 2, string.length)
  }
  if (string.indexOf("{")==0 && string.indexOf("}"==string.length)) { 
    array.push(string);
  }

  for (var i = 0; i < array.length; i++) { 
    if (IsJsonString(array[i])) {
      array[i] = JSON.parse(decodeURIComponent(array[i]));
      array[i] = urlEncodeForbiddenObj(array[i]);
    }
  }
    return {
        "value": array || [],//specCase(string) || "",
        "type": "List",
        "metadata": meta? JSON.parse(meta) : {}
    }
}

function structuredList(string) {
  counter += 1;
  if (typeof string == "object") {
    return {
      value: string.value || [],
      type: "List",
      metadata: string.metadata || {}
    };
  }

  let meta = pos(counter);
  let array=[];
  if (string.includes("[")) {
    string = string.substring(1, string.length-1)
  } 

  while (string.indexOf("},{") > -1) { 
    array.push(string.substring(0, string.indexOf("},{") + 1));
    string=substring(string.indexOf("},{") + 2, string.length)
  }
  if (string.indexOf("{")==0 && string.indexOf("}"==string.length)) { 
    array.push(string);
  }

  for (var i = 0; i < array.length; i++) { 
    if (IsJsonString(array[i])) {
      array[i] = JSON.parse(decodeURIComponent(array[i]));
      array[i] = urlEncodeForbiddenObj(array[i]);
    }
  }
  
  return {
    value: array || [],//specCase(string) || [],
    type: "List",
    metadata: meta? JSON.parse(meta) : {}
  };
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

function IsJsonString(str) {
  try {
    JSON.parse(decodeURIComponent(str));
  } catch (e) {
      return false;
  }
  return true;
}

function urlEncodeForbiddenObj(obj) { 
  var keys = Object.keys(obj);
  var new_obj = {};
  for (var i = 0; i < keys.length; i++) { 
    if(obj.hasOwnProperty(keys[i]))
      new_obj[urlEncodeForbidden(keys[i])] = (obj[keys[i]] !== null && typeof obj[keys[i]] === "object") ? urlEncodeForbiddenObj(obj[keys[i]]) : urlEncodeForbidden(obj[keys[i]]);
  }
  return new_obj;  
}

function urlEncodeForbidden(str) { //.replace(/"/g,"%22")
  return (typeof str ==="string")? str.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/'/g,"%27").replace(/=/g,"%3D").replace(/;/g,"%3B").replace(/\(/g,"%28").replace(/\)/g,"%29"):str;
}



module.exports = {
  idCheck,
  typeCheck,
  stringCheck,
  mandatoryCheck,
  stringToArray,
  stringToArrayMandatory,
  stringToArrayNum,
  stringToArrayNumMandatory,
  locationCheckNoMand,
  locationCheck,
  commaNumToUnits,
  commaNumToUnitsMandatory,
  commaNumToUnitsInt,
  commaNumToUnitsIntMandatory,
  dateCheck,  
  dateCheckMandatory,  
  structuredValue,
  structuredValueMandatory, 
  structuredList, 
  structuredListMandatory,  
  extraCheck,
  maxCargoVolume,
  removeForbiden,
  removeForbidenStrict
};
