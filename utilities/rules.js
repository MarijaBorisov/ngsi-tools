const response = require("../utilities/response");
const data = require('../services/metadata').get;
const pos = require("../services/metadata").getIgor;
const moment = require("moment");

let counter = 0;

function commaNumToUnits(oldNum, ext) { //OK Float Optional
  counter += 1;
  let existIncorrect = false;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof oldNum === 'object' && oldNum !== null) {
      (!Array.isArray(oldNum.value) && (typeof oldNum.value === "number") && (Number(oldNum.value) || Number(oldNum.value) === 0)) ?
        oldNum.value = Number(oldNum.value) : (oldNum.value = 0, existIncorrect = true); 
      return {
        "value": oldNum.value || 0,
        "type": "Float",
        "metadata": oldNum.metadata || {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    } else {
      existIncorrect = (typeof oldNum !== "object") ? true : false;
      return {
        "value": 0,
        "type": "Float",
        "metadata": {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    }
  }

  let newNum;
  let obj = [];
  let meta = pos(counter);

  (!Array.isArray(oldNum) && (Number(oldNum) || Number(oldNum) === 0)) ?
    newNum = Number(oldNum) : (newNum = 0, existIncorrect = true);
  
  if (meta) {
    obj = [];
    let send = {
      value: newNum || 0,
      type: "Float",
      metadata: JSON.parse(meta),
      warning: (existIncorrect) ? 111 : undefined
    };
    obj.push(send);
  }

  if (obj.length !== 0) {
    return obj[0];
  }

  return {
    "value": newNum || 0,
    "type": "Float",
    metadata: {},
    warning: (existIncorrect) ? 111 : undefined
  };
}

function commaNumToUnitsInt(oldNum, ext) { //OK Opional Integer
  counter += 1;
  let existIncorrect = false;
  let newNum;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof oldNum === 'object' && oldNum !== null) {
      (!Array.isArray(oldNum.value) && (typeof oldNum.value === "number") && (Number(oldNum.value) || Number(oldNum.value) === 0)) ?
        (newNum = Number(oldNum.value), oldNum.value = parseInt(Number(oldNum.value))) : (oldNum.value = 0, newNum = 0, existIncorrect = true);
      if (oldNum.value != newNum) { 
        existIncorrect = true;
      }
      return {
        "value": oldNum.value || 0,
        "type": "Integer",
        "metadata": oldNum.metadata || {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    } else {
      existIncorrect = (typeof oldNum !== "object") ? true : false;
      return {
        "value": 0,
        "type": "Integer",
        "metadata": {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    }
  }
 
  
  let obj = [];
  let meta = pos(counter);

  (!Array.isArray(oldNum) && (Number(oldNum) || Number(oldNum) === 0)) ?
    (oldNum = Number(oldNum), newNum = parseInt(Number(oldNum))) : (newNum = 0, oldNum = 0, existIncorrect = true);
  if (oldNum != newNum) { 
    existIncorrect = true;
  }
  if (meta) {
    obj = [];
    let send = {
      value: newNum || 0,
      type: "Integer",
      metadata: JSON.parse(meta),
      warning: (existIncorrect) ? 111 : undefined
    };
    obj.push(send);
  }

  if (obj.length !== 0) {
    return obj[0];
  }

  return {
    "value": newNum || 0,
    "type": "Integer",
    metadata: {},
    warning: (existIncorrect) ? 111 : undefined
  };
}

function commaNumToUnitsIntMandatory(oldNum, ext) { //OK Mandatory Integer
  counter += 1;
  let existIncorrect = false;
  let newNum;
  if (!oldNum) {
    return null;
  }
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof oldNum === "object" && oldNum !== null) {
      (!Array.isArray(oldNum.value) && (typeof oldNum.value === "number") && (Number(oldNum.value) || Number(oldNum.value) === 0)) ?
        (newNum = Number(oldNum.value), oldNum.value = parseInt(Number(oldNum.value))) : (oldNum.value = 0, newNum = 0, existIncorrect = true);
      if (oldNum.value != newNum) { 
        existIncorrect = true;
      }

      return {
        "value": oldNum.value || 0,
        "type": "Integer",
        "metadata": oldNum.metadata || {},
        "warning": (existIncorrect) ? 111 : undefined
      };
    } else {
      existIncorrect = (typeof oldNum !== "object") ? true : false;
      return {
        "value": 0,
        "type": "Integer",
        "metadata": {},
        "warning": (existIncorrect) ? 111 : undefined
      };
    }
  }

  if (oldNum.trim().length === 0) { 
    return null;
  }

  
  let obj = [];
  let meta = pos(counter);

  (!Array.isArray(oldNum) && (Number(oldNum) || Number(oldNum) === 0)) ?
    (oldNum = Number(oldNum), newNum = parseInt(Number(oldNum))) : (newNum = 0, oldNum = 0, existIncorrect = true);
  if (oldNum != newNum) { 
    existIncorrect = true;
  }
  if (meta) {
    obj = [];
    let send = {
      value: newNum || 0,
      type: "Integer",
      metadata: JSON.parse(meta),
      warning: (existIncorrect) ? 111 : undefined
    };
    obj.push(send);
  }

  if (obj.length !== 0) {
    return obj[0];
  }

  return {
    value: newNum || 0,
    type: "Integer",
    metadata: {},
    warning: (existIncorrect) ? 111 : undefined
  };
}

function commaNumToUnitsMandatory(oldNum, ext) { //OK Mandatory Float
  counter += 1;
  let existIncorrect = false;
  if (!oldNum) {
    return null;
  }
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof oldNum === 'object' && oldNum !== null) {
      (!Array.isArray(oldNum.value) && (typeof oldNum.value === "number") && (Number(oldNum.value) || Number(oldNum.value) === 0)) ?
        oldNum.value = Number(oldNum.value) : (oldNum.value = 0, existIncorrect = true); 
      return {
        "value": oldNum.value || 0,
        "type": "Float",
        "metadata": oldNum.metadata || {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    } else {
      existIncorrect = (typeof oldNum !== "object") ? true : false;     
      return {
        "value": 0,
        "type": "Float",
        "metadata": {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    }
  }

  if (oldNum.trim().length === 0) { 
    return null;
  }

  let newNum;
  let obj = [];
  let meta = pos(counter);

  (!Array.isArray(oldNum) && (Number(oldNum) || Number(oldNum) === 0)) ?
    newNum = Number(oldNum) : (newNum = 0, existIncorrect = true);
  
  if (meta) {
    obj = [];
    let send = {
      value: newNum || 0,
      type: "Float",
      metadata: JSON.parse(meta),
      warning: (existIncorrect) ? 111 : undefined
    };
    obj.push(send);
  }

  if (obj.length !== 0) {
    return obj[0];
  }

  return {
    "value": newNum || 0,
    "type": "Float",
    metadata: {},
    warning: (existIncorrect) ? 111 : undefined
  };
}

function stringToArray(string, ext) { //OK Optional List Float or String
  counter += 1;
  let existIncorrect = false;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === "object" && string !== null) {
      (Array.isArray(string.value)) ? string.value : (string.value = [], existIncorrect = true);
      string.value = string.value.reduce((finalList, raw) => {
        if (typeof raw === "string") { 
          raw = raw.trim();
          if (raw !== "") { 
            finalList.push(raw);
          }
        }
        else {
          existIncorrect = true;
        }
        return finalList;
      }, []);
    
      return {
        value: string.value || [],
        type: "List",
        metadata: string.metadata || {},
        warning: (existIncorrect) ? 111 : undefined
      };
    } else {
      existIncorrect = (typeof string !== "object") ? true : false; 
      return {
        "value": [],
        "type": "List",
        "metadata": {},
        warning: (existIncorrect) ? 111 : undefined
      };
    }

  }
  let obj = [];
  let meta = pos(counter);
  if (string) {
    string = string.trim();
    if (string.indexOf("[") == 0 && string.indexOf("]") == string.length - 1)
      string = string.substring(1, string.length - 1);
    string = string.split(',');
    string = string.reduce((finalList, raw) => {
      raw = raw.trim();
      if (typeof raw === "string" && raw !== "")
        finalList.push(raw);
      else existIncorrect = true;

      return finalList;
    }, []);
  }
  if (meta) {
    obj = [];
    let send = {
      value: string || [],
      type: "List",
      metadata: JSON.parse(meta),
      warning: existIncorrect ? 111 : undefined
    };
    obj.push(send);
  }

  if (obj.length !== 0) {
    return obj[0];
  }

  return {
    value: string || [],
    type: "List",
    metadata: {},
    warning: (existIncorrect) ? 111 : undefined
  };
}

function stringToArrayMandatory(string, ext) { //OK Mandatory List Float or String
  let existIncorrect = false;
  counter += 1;

  if (!string) {
    return null;
  }
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === 'object' && string !== null) {
      (Array.isArray(string.value)) ? string.value : (string.value = [], existIncorrect= true);
      string.value = string.value.reduce((finalList, raw) => {
        if (typeof raw === "string") { 
          raw = raw.trim();
          if (raw !== "") { 
            finalList.push(raw);
          }
        }
        else {
          existIncorrect = true;
        }
        return finalList;
      }, []);

      return {
        value: string.value || [],
        type: "List",
        metadata: string.metadata || {},
        warning: (existIncorrect) ? 111 : undefined
      }
    } else {
      existIncorrect = (typeof string !== "object") ? true : false;  
      return {
        "value": [],
        "type": "List",
        "metadata": {},
        "warning": (existIncorrect) ? 111 : undefined        
      }
    }
  }

  if (string.trim().length === 0) { 
    return null;
  }

  if (string) {
    string = string.trim();
    if (string.indexOf("[") == 0 && string.indexOf("]") == string.length - 1)
      string = string.substring(1, string.length - 1);

    let obj = [];
    let meta = pos(counter);
    string = string.split(',');

    string = string.reduce((finalList, raw) => {
      raw = raw.trim();
      if (typeof raw === "string" && raw !== "")
        finalList.push(raw);
      else
        existIncorrect = true;
      return finalList;
    }, []);
    if (meta) {
      obj = [];
      let send = {
        value: string || [],
        type: "List",
        metadata: JSON.parse(meta),
        warning: existIncorrect ? 111 : undefined
      };
      obj.push(send);
    }

    if (obj.length !== 0) {
      return obj[0];
    }
    return {
      value: string || [],
      type: "List",
      metadata: {},
      warning: existIncorrect ? 111 : undefined
    }
  }
  return null;
}

function dateCheckMandatory(date, ext) { // Not in use
  let existIncorrect = false;
  counter += 1;
  if (!date) {
    return null;
  }
  let date_val;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof date === 'object' && date !== null) {
      (Array.isArray(date.value)) ? (date_val = new Date(), existIncorrect = true) : isNaN(new Date(date.value).getTime()) ?
        (date_val = new Date(), existIncorrect = true) : date_val = new Date(date.value);
      
      return {
        value: date_val,
        type: "DateTime",
        metadata: date.metadata || {},
        warning: (existIncorrect) ? 111 : undefined
      };
    } else {
      existIncorrect = (typeof date !== "object") ? true : false; 
      return {
        value: new Date(),
        type: "DateTime",
        metadata: {},
        warning: (existIncorrect) ? 111 : undefined
      };
    }
  }

  if (date.trim().length === 0) { 
    return null;
  }

  (Array.isArray(date)) ? date_val = new Date() : isNaN(new Date(date).getTime()) ?
    (date_val = new Date(), existIncorrect = true) : date_val = new Date(date);
  
    let meta = pos(counter);
  return {
    value: date_val,
    type: "DateTime",
    metadata: meta ? JSON.parse(meta) : {},
    warning: (existIncorrect) ? 111 : undefined
  };
}

function dateCheck(date, ext) {
  let existIncorrect = false;
  counter += 1;
  if (!date)
    return {
      value: new Date(),
      type: "DateTime",
      metadata: {}
    }
  let date_val;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof date === 'object' && date !== null) {
      (Array.isArray(date.value)) ? (date_val = new Date(), existIncorrect = true) : isNaN(new Date(date.value).getTime()) ?
        (date_val = new Date(), existIncorrect = true) : date_val = new Date(date.value);
      return {
        value: date_val,
        type: "DateTime",
        metadata: date.metadata || {},
        warning: (existIncorrect) ? 111 : undefined
      };
    } else {
      existIncorrect = (typeof date !== "object") ? true : false; 
      return {
        value: new Date(),
        type: "DateTime",
        metadata: {},
        warning: (existIncorrect) ? 111 : undefined
      };
    }
  }

  (Array.isArray(date)) ? date_val = new Date() : isNaN(new Date(date).getTime()) ?
    (date_val = new Date(), existIncorrect = true) : date_val = new Date(date);
  let meta = pos(counter);
  return {
    value: date_val,
    type: "DateTime",
    metadata: meta ? JSON.parse(meta) : {},
    warning: (existIncorrect) ? 111 : undefined
  }
}


function mandatoryCheck(attribute, ext) { //OK Mandatory String
  counter += 1;
  let existIncorrect = false;
  if (!attribute) {
    return null;
  }
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof attribute === 'object' && attribute !== null) {
      (typeof attribute.value === "string") ? attribute.value : (attribute.value = "", existIncorrect = true);

      return {
        value: attribute.value || "",
        type: "String",
        metadata: attribute.metadata || {},
        warning: (existIncorrect) ? 111 : undefined
      };
    } else {
      existIncorrect = (typeof attribute !== "object") ? true : false; 
      return {
        value: "",
        type: "String",
        metadata: {},
        warning: (existIncorrect) ? 111 : undefined
      };
    }
  }

  if (attribute.trim().length === 0) { 
    return null;
  }

  const test = attribute.split("");
  const forbide = ["<", ">", "'", ";", "(", ")"];
  test.forEach((element) => {
    if (forbide.includes(element)) {
      throw "Forbidden character";
    }
  });
  let obj = [];
  let meta = pos(counter);
  if (meta) {
    obj = [];
    const send = {
      value: attribute || "",
      type: "String",
      metadata: JSON.parse(meta),
    };
    obj.push(send);
  }

  if (obj.length !== 0) {
    return obj[0];
  }

  return {
    value: attribute || "",
    type: "String",
    metadata: {},
  };
}


function stringCheck(value, ext) { //OK Optional String
  counter += 1;
  let existIncorrect = false;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof value === 'object' && value !== null) {
      (typeof value.value === "string") ?  value.value : (value.value = "", existIncorrect = true);
      return {
        "value": value.value || "",
        "type": "String",
        "metadata": value.metadata || {},
        "warning": (existIncorrect)? 111 : undefined
      }
    } else {
      existIncorrect = (typeof value !== "object") ? true : false; 
      return {
        "value": "",
        "type": "String",
        "metadata": {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    }
  }

  let meta = pos(counter);
  if (meta) {
    return {
      value: value || "",
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

function stringToArrayNum(string, ext) { //OK Optional List<Float>
  counter += 1;
  let existIncorrect = false;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === 'object' && string !== null) {
      (Array.isArray(string.value)) ? string.value : (string.value = [], existIncorrect = true);
      string.value = string.value.reduce((finalList, raw) => {
        if (typeof raw === "number" && (Number(raw) || Number(raw) === 0))
          finalList.push(Number(raw));
        else existIncorrect = true;
        return finalList;
      }, []);
      return {
        value: string.value || [],
        type: "List",
        metadata: string.metadata || {},
        warning: (existIncorrect) ? 111 : undefined
      }
    } else {
      existIncorrect = (typeof string !== "object") ? true : false; 
      return {
        "value": [],
        "type": "List",
        "metadata": {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    }
  }

  if (string) {
    string = string.trim();
    if (string.indexOf("[") == 0 && string.indexOf("]") == string.length - 1)
      string = string.substring(1, string.length - 1);
    let obj = [];
    let meta = pos(counter);
    if (meta) {
      obj = [];
      let send = {
        // value: arrToNum(string),
        value: (arrToNum(string)).data,
        type: "List",
        metadata: JSON.parse(meta),
        warning: (arrToNum(string)).existIncorrect ? 111 : undefined
      };
      obj.push(send);
    }

    if (obj.length !== 0) {
      return obj[0];
    }
   
    return {
      value: (arrToNum(string)).data,
      type: "List",
      metadata: {},
      warning: (arrToNum(string)).existIncorrect ? 111 : undefined
    }
  } else {
    obj = [];
    let meta = pos(counter);
    let send = {
      value: [],
      type: "List",
      metadata: meta ? JSON.parse(meta) : {}
    };
    obj.push(send);
    if (obj.length !== 0) {
      return obj[0];
    }
  }
  return null;
}

function stringToArrayNumMandatory(string, ext) { //OK Mandatory List<Float>
  counter += 1;
  let existIncorrect = false;
  if (!string) {
    return null;
  }
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === "object" && string !== null) {
      // string.value = Array.isArray(string.value) ? string.value : [];
      (Array.isArray(string.value)) ? string.value : (string.value = [], existIncorrect = true);
      string.value = string.value.reduce((finalList, raw) => {
        if (typeof raw === "number" && (Number(raw) || Number(raw) === 0))
          finalList.push(Number(raw));
        else
          existIncorrect = true
        return finalList;
      }, []);

      return {
        value: string.value || [],
        type: "List",
        metadata: string.metadata || {},
        warning: (existIncorrect) ? 111 : undefined
      };
    } else {
      existIncorrect = (typeof string !== "object") ? true : false; 
      return {
        value: [],
        type: "List",
        metadata: {},
        warning: (existIncorrect) ? 111 : undefined
      };
    }
  }

  if (string.trim().length === 0) { 
    return null;
  }

  if (string) {
    string = string.trim();
    if (string.indexOf("[") == 0 && string.indexOf("]") == string.length - 1)
      string = string.substring(1, string.length - 1);
    let obj = [];
    let meta = pos(counter);
    if (meta) {
      obj = [];
      let send = {
        value: (arrToNum(string)).data,
        type: "List",
        metadata: JSON.parse(meta),
        warning: (arrToNum(string)).existIncorrect ? 111 : undefined
      };
      obj.push(send);
    }

    if (obj.length !== 0) {
      return obj[0];
    }

    return {
      value: (arrToNum(string)).data,
      type: "List",
      metadata: {},
      warning: (arrToNum(string)).existIncorrect ? 111 : undefined
    };
  } else {
    obj = [];
    let meta = pos(counter);
    let send = {
      value: [],
      type: "List",
      metadata: meta ? JSON.parse(meta) : {}
    };
    obj.push(send);
    if (obj.length !== 0) {
      return obj[0];
    }
  }
  return null;
}

function idCheck(attr, ext) { //OK ID
  counter = 0;
  counter += 1;
  if (typeof attr === 'string')
    return attr;
  else return null;
}

function typeCheck(attr, ext) { //OK type
  counter += 1;
  if (typeof attr === 'string')
    return attr;
  else return null;
}

function locationCheck(location, ext) { //OK Mandatory geo:json
  let existIncorrect = false;
  counter += 1;
  if (!location) {
    return null;
  }
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof location === 'object' && location !== null) {
      if (location.value && typeof location.value === "object" && !Array.isArray(location.value)) {
        if (Object.keys(location.value).length === 0) {
          existIncorrect = false;
          location.value = {};
        }
        else if (location.value.type && location.value.type == "Point" && location.value.coordinates && Array.isArray(location.value.coordinates) &&
          location.value.coordinates.length === 2 && typeof location.value.coordinates[0] === "number" && typeof location.value.coordinates[1] === "number" &&
          location.value.coordinates[0] <= 180 && location.value.coordinates[0] >= -180 && location.value.coordinates[1] <= 90 && location.value.coordinates[1] >= -90);
        else {
          location.value = {};
          existIncorrect = true;
        }
      } else {
        location.value = {};
        existIncorrect = true;
      }
      return {
        value: location.value || {},
        type: "geo:json",
        metadata: location.metadata || {},
        warning: (existIncorrect) ? 111 : undefined
      }
    } else {
      existIncorrect = (typeof location != 'object') ? true : false;
      return {
        value: {},
        type: "geo:json",
        metadata: {},
        warning: (existIncorrect) ? 111 : undefined
      }
    }
  }

  if (location.trim().length === 0) { 
    return null;
  }

  const data = location.substring(location.indexOf('[') + 1, location.indexOf(']'));
  const coordinates = data.split(',', 2);

  let meta = pos(counter);
  if (!data || data.length === 0 || coordinates.length < 2 || coordinates[0].trim().length == 0 || coordinates[1].trim().length == 0) {
    existIncorrect = (!location || location.trim().length === 0) ? false : true; 
    return {
      value: {},
      type: "geo:json",
      metadata: meta ? JSON.parse(meta) : {},
      warning: (existIncorrect) ? 111 : undefined
    };
  }

  const x = Number(coordinates[0]);
  const y = Number(coordinates[1]);

  // if (data.length === 0) {
  //   return null;
  // }
  if (!isNaN(x) && typeof x === 'number' && x <= 180 && x >= -180 && !isNaN(y) && typeof y === 'number' && y <= 90 && y >= -90) { // x || x
    let obj = [];
    // let meta = pos(counter);
    if (meta) {
      obj = [];
      let send = {
        value: {
          "type": "Point",
          "coordinates": [x, y]
        },
        type: "geo:json",
        metadata: JSON.parse(meta)
      };
      obj.push(send);

    }

    if (obj.length !== 0) {
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
  } else { 
    existIncorrect = true;
    return {
      value: {},
      type: "geo:json",
      metadata: meta ? JSON.parse(meta) : {},
      warning: existIncorrect ? 111 : undefined
    }
  }
}

function locationCheckNoMand(location, ext) { // Optional geo:json
  let existIncorrect = false;
  counter += 1;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof location === "object" && location !== null) {
      if (location.value && typeof location.value === "object" && !Array.isArray(location.value)) {
        if (Object.keys(location.value).length === 0) {
          existIncorrect = false;
          location.value = {};
        }
        else if (location.value.type && location.value.type == "Point" && location.value.coordinates && Array.isArray(location.value.coordinates) &&
          location.value.coordinates.length === 2 && typeof location.value.coordinates[0] === "number" && typeof location.value.coordinates[1] === "number" &&
          location.value.coordinates[0] <= 180 && location.value.coordinates[0] >= -180 && location.value.coordinates[1] <= 90 && location.value.coordinates[1] >= -90);
        else {
          location.value = {};
          existIncorrect = true;
        };
      } else { 
        location.value = {};
        existIncorrect = true;
      }

      return {
        value: location.value || {},
        type: "geo:json",
        metadata: location.metadata || {},
        warning: (existIncorrect) ? 111 : undefined
      }
    } else {
      existIncorrect = location != "object" ? true : false;
      return {
        value: {},
        type: "geo:json",
        metadata: {},
        warning: (existIncorrect) ? 111 : undefined
      }
    }
  }

  const data = location ? location.substring(location.indexOf('[') + 1, location.indexOf(']')) : "";
  const coordinates = data ? data.split(',', 2) : [];

  let meta = pos(counter);
  if (!data || data.length === 0 || coordinates.length < 2 || coordinates[0].trim().length == 0 || coordinates[1].trim().length == 0) {
    existIncorrect = (!location || location.trim().length === 0) ? false : true; 
    return {
      value: {},
      type: "geo:json",
      metadata: meta ? JSON.parse(meta) : {},
      warning: (existIncorrect) ? 111 : undefined
    };
  }

  const x = Number(coordinates[0]);
  const y = Number(coordinates[1]);

  if (!isNaN(x) && typeof x === 'number' && x <= 180 && x >= -180 && !isNaN(y) && typeof y === 'number' && y <= 90 && y >= -90) {
    let obj = [];
    if (meta) {
      obj = [];
      let send = {
        value: {
          "type": "Point",
          "coordinates": [x, y]
        },
        type: "geo:json",
        metadata: JSON.parse(meta)
      };
      obj.push(send);

    }

    if (obj.length !== 0) {
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
  else existIncorrect = true;
  return {
    value: {},
    type: "geo:json",
    metadata: meta ? JSON.parse(meta) : {},
    warning: existIncorrect ? 111 : undefined
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
  }, []);

  return result;
}

function arrToNum(string) {
  let existIncorrect = false;
  // let data = string ? string.split(',').map(raw => Number(raw.trim()) ? Number(raw.trim()) : 0) : [];
  let data = [];
  if (string) {
    string = string.split(',');
    data = string.reduce((finalList, str) => {
      if (str !== "" && (Number(str) || Number(str) === 0))
        finalList.push(Number(str));
      else
        existIncorrect = true;
    
      return finalList;
    }, []);
  }
  // return data;
  return { data: data, existIncorrect: existIncorrect };
}

function structuredValue(string, ext) {
  let existIncorrect = false;
  counter += 1
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === "object" && string !== null) {
      // string.value = typeof string.value === "object" && !Array.isArray(string.value) ? string.value : {};
      (typeof string.value === "object" && !Array.isArray(string.value)) ? string.value : (string.value = {}, existIncorrect = true);
      return {
        "value": string.value || {},
        "type": "StructuredValue",
        "metadata": string.metadata || {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    } else {
      existIncorrect = (typeof string !== "object") ? true : false;
      return {
        "value": {},
        "type": "StructuredValue",
        "metadata": {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    }
  }

  let meta = pos(counter);
  var string_obj;
  if (IsJsonString(string)) {
    string_obj = JSON.parse(decodeURIComponent(string));
    string_obj = urlEncodeForbiddenObj(string_obj);
  } else {
    string_obj = {};
    existIncorrect = true;
  }

  if (meta) {
    return {
      "value": string_obj || {}, // specCase(string) || {},
      "type": "StructuredValue",
      metadata: JSON.parse(meta),
      warning: existIncorrect ? 111 : undefined
    };
  }
  
  return {
    "value": string_obj || {}, // specCase(string) || {},
    "type": "StructuredValue",
    "metadata": {},
    "warning": existIncorrect ? 111 : undefined
  }
}

function structuredValueMandatory(string, ext) {
  let existIncorrect = false;
  counter += 1
  if (!string)
    return null;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === "object" && string !== null) {
      (typeof string.value === "object" && !Array.isArray(string.value)) ? string.value  : (string.value = {}, existIncorrect = true);
      return {
        "value": string.value || {},
        "type": "StructuredValue",
        "metadata": string.metadata || {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    } else {
      existIncorrect = (typeof string != "object") ? true : false;
      return {
        "value": {},
        "type": "StructuredValue",
        "metadata": {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    }
  }

  if (string.trim().length === 0) { 
    return null;
  }

  let meta = pos(counter);
  var string_obj;
  if (IsJsonString(string)) {
    string_obj = JSON.parse(decodeURIComponent(string));
    string_obj = urlEncodeForbiddenObj(string_obj);
  } else {
    string_obj = {};
    existIncorrect = true;
  }
  return {
    "value": string_obj, //specCase(string) || "",
    "type": "StructuredValue",
    "metadata": meta ? JSON.parse(meta) : {},
    "warning": existIncorrect ? 111 : undefined
  }
}

function structuredListMandatoryOld(string, ext) {
  let existIncorrect = false;
  counter += 1
  if (!string) {
    return null;
  }
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === "object" && string !== null) {
      //  string.value = Array.isArray(string.value) ? string.value : [];
      Array.isArray(string.value) ? string.value : (string.value = [], existIncorrect = true);
      string.value = string.value.reduce((finalList, raw) => {
        if (typeof raw === "object" && !Array.isArray(raw))
          finalList.push(raw);
        else
          existIncorrect = true;
      
        return finalList;
      }, []);
      return {
        "value": string.value || [],
        "type": "List",
        "metadata": string.metadata || {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    } else {
      existIncorrect = (typeof string != "object") ? true : false;
      return {
        "value": [],
        "type": "List",
        "metadata": {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    }
  }

  if (string.trim().length === 0) { 
    return null;
  }
  
  let meta = pos(counter);
  let array = [];
  var incorrectData=[];
  // incorrectData = IsJsonString(string) ? JSON.parse(string) : [];
  // incorrectData = incorrectData.filter(x => typeof x !== 'object' || Array.isArray(x));
  if (IsJsonString(string) && Array.isArray(JSON.parse(decodeURIComponent( string)))) {
    incorrectData = JSON.parse(decodeURIComponent(string));
    incorrectData = incorrectData.filter(x => typeof x !== 'object' || Array.isArray(x));
  } else { 
    incorrectData.push(string);
  }
  string = string.trim();
  if (string.indexOf("[") == 0 && string.indexOf("]") == string.length - 1) {
    string = string.substring(1, string.length - 1).trim();
  }
  var j = 1;
  let obj_start_index = string.indexOf("{");
  var obj_end_index = getPosition(string, "}", j);
  var test;
  while (obj_start_index > -1 && obj_end_index > -1 && obj_start_index < string.length && obj_end_index < string.length) {
    test = string.substring(obj_start_index, obj_end_index + 1);
    if (IsJsonString(test)) {
      test = JSON.parse(decodeURIComponent(test));
      test = urlEncodeForbiddenObj(test);
      array.push(test);
      j = 1;
      string = string.substring(obj_end_index + 1, string.length).trim();
      obj_start_index = string.indexOf("{");
      obj_end_index = getPosition(string, "}", j);
    } else {
      j++;
      obj_end_index = getPosition(string, "}", j);
      if (obj_end_index >= string.length)
        break;
    }
  }
  string = string.trim();
  if (string.indexOf("{") == 0 && string.lastIndexOf("}") == string.length - 1) {
    if (IsJsonString(string)) {
      string = JSON.parse(decodeURIComponent(string));
      string = urlEncodeForbiddenObj(string);
      array.push(string);
    }
  }

  return {
    "value": array || [], //specCase(string) || "",
    "type": "List",
    "metadata": meta ? JSON.parse(meta) : {},
    "warning": (incorrectData.length>0) ? 111 : undefined
  }
}

function structuredListMandatory(string, ext) {
  let existIncorrect = false;
  counter += 1
  if (!string) {
    return null;
  }
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === "object" && string !== null) {
      Array.isArray(string.value) ? string.value : (string.value = [], existIncorrect = true);
      string.value = string.value.reduce((finalList, raw) => {
        if (typeof raw === "object" )
          finalList.push(raw);
        else
          existIncorrect = true;
      
        return finalList;
      }, []);
      return {
        "value": string.value || [],
        "type": "List",
        "metadata": string.metadata || {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    } else {
      existIncorrect = (typeof string != "object") ? true : false;
      return {
        "value": [],
        "type": "List",
        "metadata": {},
        "warning": (existIncorrect) ? 111 : undefined
      }
    }
  }

  if (string.trim().length === 0) { 
    return null;
  }
  
  let meta = pos(counter);
  let array = [];
  var incorrectData=[];

  if (IsJsonString(string) && Array.isArray(JSON.parse(decodeURIComponent( string)))) {
    incorrectData = JSON.parse(decodeURIComponent(string));
    incorrectData = incorrectData.filter(x => typeof x !== 'object');
    if (incorrectData.length === 0) { 
      array = JSON.parse(decodeURIComponent(string));
      array = urlEncodeForbiddenObj(array);
      return {
        "value": array || [],
        "type": "List",
        "metadata": meta ? JSON.parse(meta) : {},
        "warning": (incorrectData.length>0) ? 111 : undefined
      }
    }
  } else { 
    incorrectData.push(string);
  }
  string = string.trim();
  if (string.indexOf("[") == 0 && string.lastIndexOf("]") == string.length - 1) {
    string = string.substring(1, string.length - 1).trim();
  }
  var j = 1;
  let obj_start_index = string.indexOf("{");
  var obj_end_index = getPosition(string, "}", j);
  var start_arr_index = string.indexOf("[");
  var stop_arr_index = getPosition(string, "]", j);
  var start_index;
  var end_index;
  var limits;
  var finished_search_index = 0;
  if (obj_start_index > -1 && (obj_start_index < start_arr_index || start_arr_index == -1)) {
    start_index = obj_start_index;
    end_index = obj.end_index;
    limits = ["{", "}"];
  } else { 
    start_index = start_arr_index;
    end_index = stop_arr_index;
    limits = ["[", "]"];
  }
  console.log(limits);
  var test;
  var obj_stop = false;
  while (start_index < end_index && start_index > -1 && end_index > -1 && start_index < string.length && end_index < string.length) {
    test = string.substring(start_index, end_index + 1);
    console.log("test",test);
    if (IsJsonString(test)) {
      console.log("In true", test, limits);
      test = JSON.parse(decodeURIComponent(test));
      test = urlEncodeForbiddenObj(test);
      array.push(test);
      j = 1;
      string = string.substring(end_index + 1, string.length).trim();
      finished_search_index = end_index + 1;
      obj_start_index = string.indexOf("{");
      obj_end_index = getPosition(string, "}", j);
      start_arr_index = string.indexOf("[");
      stop_arr_index = getPosition(string, "]", j);
      if (obj_start_index > -1 && (obj_start_index < start_arr_index || start_arr_index == -1)) {
        start_index = obj_start_index;
        end_index = obj_end_index;
        limits = ["{", "}"];
      } else {
        start_index = start_arr_index;
        end_index = stop_arr_index;
        limits = ["[", "]"];
      }
      obj_stop = false;
    } else if (obj_stop != true) {
      j++;
      console.log("***In error", test, limits);
      var end_index_new = getPosition(string, limits[1], j);
      if (end_index_new >= string.length) {
        console.log("Value bigger then end");
        j = 1;
        string = string.substring(end_index_new, string.length);
        obj_start_index = string.indexOf("{");
        obj_end_index = getPosition(string, "}", j);
        start_arr_index = string.indexOf("[");
        stop_arr_index = getPosition(string, "]", j);
        if (obj_start_index > -1 && (obj_start_index < start_arr_index || start_arr_index == -1)) {
          start_index = obj_start_index;
          end_index = obj_end_index;
          limits = ["{", "}"];
        } else {
          start_index = start_arr_index;
          end_index = stop_arr_index;
          limits = ["[", "]"];
        }
      } else {
        console.log("in another check");
        end_index = end_index_new;
        var test = string.substring(start_index, end_index+1);
        var n_closed = (test.match(new RegExp("\\"+limits[1], "g")) || []).length;
        var n_opened = (test.match(new RegExp("\\"+limits[0], "g")) || []).length;
        console.log("next check", n_closed, n_opened);
        if (n_opened == n_closed) {
          obj_stop = true;
        } else continue;
      }
    } else { 
      console.log("object stop == true");
      j = 1;
      string = string.substring(end_index + 1, string.length).trim();
      finished_search_index = end_index + 1;
      obj_start_index = string.indexOf("{");
      obj_end_index = getPosition(string, "}", j);
      start_arr_index = string.indexOf("[");
      stop_arr_index = getPosition(string, "]", j);
      if (obj_start_index > -1 && (obj_start_index < start_arr_index || start_arr_index == -1)) {
        start_index = obj_start_index;
        end_index = obj_end_index;
        limits = ["{", "}"];
      } else {
        start_index = start_arr_index;
        end_index = stop_arr_index;
        limits = ["[", "]"];
      }
      console.log(string, limits);
      obj_stop = false;
    }
  }
  console.log("after", string);
  string = string.trim();
  if (((string.indexOf("{") == 0 && string.lastIndexOf("}") == string.length - 1) || (string.indexOf("[") == 0 && string.lastIndexOf("]") == string.length - 1))){
    if (IsJsonString(string)) {
      string = JSON.parse(decodeURIComponent(string));
      string = urlEncodeForbiddenObj(string);
      array.push(string);
    }
  }

  return {
    "value": array || [],
    "type": "List",
    "metadata": meta ? JSON.parse(meta) : {},
    "warning": (incorrectData.length>0) ? 111 : undefined
  }
}

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

function structuredListOld(string, ext) {
  let existIncorrect = false;
  counter += 1;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === "object" && string !== null) {
      Array.isArray(string.value) ? string.value : (string.value = [], existIncorrect = true);
      string.value = string.value.reduce((finalList, raw) => {
        if (typeof raw === "object" && !Array.isArray(raw))
          finalList.push(raw);
        else
          existIncorrect = true;
        return finalList;
      }, []);
      return {
        value: string.value || [],
        type: "List",
        metadata: string.metadata || {},
        warning: (existIncorrect) ? 111 : undefined
      };
    } else {
      existIncorrect = (typeof string != "object") ? true : false;
      return {
        value: [],
        type: "List",
        metadata: {},
        warning: (existIncorrect) ? 111 : undefined
      };
    }
  }

  let meta = pos(counter);
  let array = [];
  var incorrectData = [];
  // incorrectData = IsJsonString(string) ? JSON.parse(string) : [];
  // incorrectData = incorrectData.filter(x => typeof x !== 'object' || Array.isArray(x));
  if (IsJsonString(string) && Array.isArray(JSON.parse(decodeURIComponent( string)))) {
    incorrectData = JSON.parse(decodeURIComponent(string));
    incorrectData = incorrectData.filter(x => typeof x !== 'object' || Array.isArray(x));
  } else { 
    incorrectData.push(string);
  }
  string = string.trim();

  if (string.indexOf("[") == 0 && string.indexOf("]") == string.length - 1) {
    string = string.substring(1, string.length - 1).trim();
  }
  var j = 1;
  let obj_start_index = string.indexOf("{");
  var obj_end_index = getPosition(string, "}", j);
  var test;
  while (obj_start_index > -1 && obj_end_index > -1 && obj_start_index < string.length && obj_end_index < string.length) {
    test = string.substring(obj_start_index, obj_end_index + 1);
    if (IsJsonString(test)) {
      test = JSON.parse(decodeURIComponent(test));
      test = urlEncodeForbiddenObj(test);
      array.push(test);
      j = 1;
      string = string.substring(obj_end_index + 1, string.length).trim();
      obj_start_index = string.indexOf("{");
      obj_end_index = getPosition(string, "}", j);
    } else {
      j++;
      obj_end_index = getPosition(string, "}", j);
      if (obj_end_index >= string.length)
        break;
    }
  }
  string = string.trim();
  if (string.indexOf("{") == 0 && string.lastIndexOf("}") == string.length - 1) {
    if (IsJsonString(string)) {
      string = JSON.parse(decodeURIComponent(string));
      string = urlEncodeForbiddenObj(string);
      array.push(string);
    }
  }

  return {
    value: array || [], //specCase(string) || [],
    type: "List",
    metadata: meta ? JSON.parse(meta) : {},
    "warning": (incorrectData.length > 0) ? 111 : undefined
  };
}

function structuredList(string, ext) {
  let existIncorrect = false;
  counter += 1;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === "object" && string !== null) {
      Array.isArray(string.value) ? string.value : (string.value = [], existIncorrect = true);
      string.value = string.value.reduce((finalList, raw) => {
        if (typeof raw === "object" )//&& !Array.isArray(raw)
          finalList.push(raw);
        else
          existIncorrect = true;
        return finalList;
      }, []);
      return {
        value: string.value || [],
        type: "List",
        metadata: string.metadata || {},
        warning: (existIncorrect) ? 111 : undefined
      };
    } else {
      existIncorrect = (typeof string != "object") ? true : false;
      return {
        value: [],
        type: "List",
        metadata: {},
        warning: (existIncorrect) ? 111 : undefined
      };
    }
  }


  let meta = pos(counter);
  let array = [];
  var incorrectData=[];

  if (IsJsonString(string) && Array.isArray(JSON.parse(decodeURIComponent( string)))) {
    incorrectData = JSON.parse(decodeURIComponent(string));
    incorrectData = incorrectData.filter(x => typeof x !== 'object');
    if (incorrectData.length === 0) { 
      array = JSON.parse(decodeURIComponent(string));
      array = urlEncodeForbiddenObj(array);
      return {
        "value": array || [],
        "type": "List",
        "metadata": meta ? JSON.parse(meta) : {},
        "warning": (incorrectData.length>0) ? 111 : undefined
      }
    }
  } else { 
    incorrectData.push(string);
  }
  string = string.trim();
  if (string.indexOf("[") == 0 && string.lastIndexOf("]") == string.length - 1) {
    string = string.substring(1, string.length - 1).trim();
  }
  var j = 1;
  let obj_start_index = string.indexOf("{");
  var obj_end_index = getPosition(string, "}", j);
  var start_arr_index = string.indexOf("[");
  var stop_arr_index = getPosition(string, "]", j);
  var start_index;
  var end_index;
  var limits;
  var finished_search_index = 0;
  if (obj_start_index > -1 && (obj_start_index < start_arr_index || start_arr_index == -1)) {
    start_index = obj_start_index;
    end_index = obj.end_index;
    limits = ["{", "}"];
  } else { 
    start_index = start_arr_index;
    end_index = stop_arr_index;
    limits = ["[", "]"];
  }
  console.log(limits);
  var test;
  var obj_stop = false;
  while (start_index < end_index && start_index > -1 && end_index > -1 && start_index < string.length && end_index < string.length) {
    test = string.substring(start_index, end_index + 1);
    console.log("test",test);
    if (IsJsonString(test)) {
      console.log("In true", test, limits);
      test = JSON.parse(decodeURIComponent(test));
      test = urlEncodeForbiddenObj(test);
      array.push(test);
      j = 1;
      string = string.substring(end_index + 1, string.length).trim();
      finished_search_index = end_index + 1;
      obj_start_index = string.indexOf("{");
      obj_end_index = getPosition(string, "}", j);
      start_arr_index = string.indexOf("[");
      stop_arr_index = getPosition(string, "]", j);
      if (obj_start_index > -1 && (obj_start_index < start_arr_index || start_arr_index == -1)) {
        start_index = obj_start_index;
        end_index = obj_end_index;
        limits = ["{", "}"];
      } else {
        start_index = start_arr_index;
        end_index = stop_arr_index;
        limits = ["[", "]"];
      }
      obj_stop = false;
    } else if (obj_stop != true) {
      j++;
      console.log("***In error", test, limits);
      var end_index_new = getPosition(string, limits[1], j);
      if (end_index_new >= string.length) {
        console.log("Value bigger then end");
        j = 1;
        string = string.substring(end_index_new, string.length);
        obj_start_index = string.indexOf("{");
        obj_end_index = getPosition(string, "}", j);
        start_arr_index = string.indexOf("[");
        stop_arr_index = getPosition(string, "]", j);
        if (obj_start_index > -1 && (obj_start_index < start_arr_index || start_arr_index == -1)) {
          start_index = obj_start_index;
          end_index = obj_end_index;
          limits = ["{", "}"];
        } else {
          start_index = start_arr_index;
          end_index = stop_arr_index;
          limits = ["[", "]"];
        }
      } else {
        console.log("in another check");
        end_index = end_index_new;
        var test = string.substring(start_index, end_index+1);
        var n_closed = (test.match(new RegExp("\\"+limits[1], "g")) || []).length;
        var n_opened = (test.match(new RegExp("\\"+limits[0], "g")) || []).length;
        console.log("next check", n_closed, n_opened);
        if (n_opened == n_closed) {
          obj_stop = true;
        } else continue;
      }
    } else { 
      console.log("object stop == true");
      j = 1;
      string = string.substring(end_index + 1, string.length).trim();
      finished_search_index = end_index + 1;
      obj_start_index = string.indexOf("{");
      obj_end_index = getPosition(string, "}", j);
      start_arr_index = string.indexOf("[");
      stop_arr_index = getPosition(string, "]", j);
      if (obj_start_index > -1 && (obj_start_index < start_arr_index || start_arr_index == -1)) {
        start_index = obj_start_index;
        end_index = obj_end_index;
        limits = ["{", "}"];
      } else {
        start_index = start_arr_index;
        end_index = stop_arr_index;
        limits = ["[", "]"];
      }
      console.log(string, limits);
      obj_stop = false;
    }
  }
  console.log("after", string);
  string = string.trim();
  if (((string.indexOf("{") == 0 && string.lastIndexOf("}") == string.length - 1) || (string.indexOf("[") == 0 && string.lastIndexOf("]") == string.length - 1))){
    if (IsJsonString(string)) {
      string = JSON.parse(decodeURIComponent(string));
      string = urlEncodeForbiddenObj(string);
      array.push(string);
    }
  }

  return {
    "value": array || [],
    "type": "List",
    "metadata": meta ? JSON.parse(meta) : {},
    "warning": (incorrectData.length>0) ? 111 : undefined
  }
}

function specCase(string) {
  if (!string) {
    return string;
  }
  if (string.includes("[")) {
    let temp = string.substring(1, string.length - 1)
    return JSON.parse(temp)
  }
  return JSON.parse(string.substring(1, string.length - 1));
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
    if (obj.hasOwnProperty(keys[i]))
      new_obj[urlEncodeForbidden(keys[i])] = (obj[keys[i]] !== null && typeof obj[keys[i]] === "object" && !Array.isArray(obj[keys[i]])) ? urlEncodeForbiddenObj(obj[keys[i]]) : Array.isArray(obj[keys[i]]) ? urlEncodeForbiddenArray(obj[keys[i]]) : urlEncodeForbidden(obj[keys[i]]);
  }
  return new_obj;
}

function urlEncodeForbidden(str) { //.replace(/"/g,"%22")
  return (typeof str === "string") ? str.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/'/g, "%27").replace(/=/g, "%3D").replace(/;/g, "%3B").replace(/\(/g, "%28").replace(/\)/g, "%29") : (str !== null && typeof str === "object" && !Array.isArray(str)) ? urlEncodeForbiddenObj(str) : Array.isArray(str) ? urlEncodeForbiddenArray(str) : str;
}

function urlEncodeForbiddenArray(arr) {
  if (arr)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = urlEncodeForbidden(arr[i]);
    }
  return arr;
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