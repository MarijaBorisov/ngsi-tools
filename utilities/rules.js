const response = require("../utilities/response");
const data = require('../services/metadata').get;
const pos = require("../services/metadata").getIgor;
const moment = require("moment");

let counter = 0;

function commaNumToUnits(oldNum, ext) { //OK Float Optional
  counter += 1;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof oldNum === 'object' && oldNum !== null) {
      return {
        "value": Number(oldNum.value) || 0,
        "type": "Float",
        "metadata": oldNum.metadata || {}
      }
    } else {
      return {
        "value": 0,
        "type": "Float",
        "metadata": {}
      }
    }
  }

  const newNum = Number(oldNum) ? Number(oldNum) : 0;
  let obj = [];
  let meta = pos(counter);
  if (meta) {
    obj = [];
    let send = {
      value: newNum || 0,
      type: "Float",
      metadata: JSON.parse(meta)
    };
    obj.push(send);

  }

  if (obj.length !== 0) {
    return obj[0];
  }

  return {
    "value": newNum || 0,
    "type": "Float",
    metadata: {}
  };
}

function commaNumToUnitsInt(oldNum, ext) { //OK Opional Integer
  counter += 1;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof oldNum === 'object' && oldNum !== null) {
      oldNum.value = Number(oldNum.value) ? parseInt(Number(oldNum.value)) : 0;
      return {
        "value": oldNum.value || 0,
        "type": "Integer",
        "metadata": oldNum.metadata || {}
      }
    } else {
      return {
        "value": 0,
        "type": "Integer",
        "metadata": {}
      }
    }
  }
  const newNum = Number(oldNum) ? parseInt(Number(oldNum)) : 0;
  let obj = [];
  let meta = pos(counter);
  if (meta) {
    obj = [];
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
    "value": newNum || 0,
    "type": "Integer",
    metadata: {}
  };
}

function commaNumToUnitsIntMandatory(oldNum, ext) { //OK Mandatory Integer
  counter += 1;
  if (!oldNum) {
    return null;
  }
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof oldNum === "object" && oldNum !== null) {
      oldNum.value = Number(oldNum.value) ? parseInt(Number(oldNum.value)) : 0;
      return {
        "value": oldNum.value || 0,
        "type": "Integer",
        "metadata": oldNum.metadata || {}
      };
    } else {
      return {
        "value": 0,
        "type": "Integer",
        "metadata": {}
      };
    }
  }

  const newNum = Number(oldNum) ? parseInt(Number(oldNum)) : 0;
  let obj = [];
  let meta = pos(counter);
  if (meta) {
    obj = [];
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

function commaNumToUnitsMandatory(oldNum, ext) { //OK Mandatory Float
  counter += 1;
  if (!oldNum) {
    return null;
  }
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof oldNum === 'object' && oldNum !== null) {
      return {
        "value": Number(oldNum.value) || 0,
        "type": "Float",
        "metadata": oldNum.metadata || {}
      }
    } else {
      return {
        "value": 0,
        "type": "Float",
        "metadata": {}
      }
    }
  }

  const newNum = Number(oldNum) ? Number(oldNum) : 0;
  let obj = [];
  let meta = pos(counter);
  if (meta) {
    obj = [];
    let send = {
      value: newNum || 0,
      type: "Float",
      metadata: JSON.parse(meta)
    };
    obj.push(send);
  }

  if (obj.length !== 0) {
    return obj[0];
  }

  return {
    "value": newNum || 0,
    "type": "Float",
    metadata: {}
  };
}

function stringToArray(string, ext) { //OK Optional List Float or String
  counter += 1;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === "object" && string !== null) {
      string.value = Array.isArray(string.value) ? string.value : [];
      // string.value = string.value.map(raw => typeof raw === "string" ? raw.trim() : "");
      string.value = string.value.reduce((finalList, raw) => {
        if (typeof raw === "string")
          finalList.push(raw.trim());
        return finalList;
      }, []);
      return {
        value: string.value || [],
        type: "List",
        metadata: string.metadata || {}
      };
    } else {
      return {
        "value": [],
        "type": "List",
        "metadata": {}
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
      return finalList;
    }, []);
  }
  if (meta) {
    obj = [];
    let send = {
      value: string || [],
      type: "List",
      metadata: JSON.parse(meta)
    };
    obj.push(send);
  }

  if (obj.length !== 0) {
    return obj[0];
  }

  return {
    value: string || [],
    type: "List",
    metadata: {}
  };
}

function stringToArrayMandatory(string, ext) { //OK Mandatory List Float or String
  counter += 1;
  if (!string) {
    return null;
  }
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === 'object' && string !== null) {
      string.value = Array.isArray(string.value) ? string.value : [];
      string.value = string.value.reduce((finalList, raw) => {
        raw = raw.trim();
        if (typeof raw === "string" && raw !== "")
          finalList.push(raw);
        return finalList;
      }, []);
      return {
        value: string.value || [],
        type: "List",
        metadata: string.metadata || {}
      }
    } else {
      return {
        "value": [],
        "type": "List",
        "metadata": {}
      }
    }
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
      return finalList;
    }, []);
    if (meta) {
      obj = [];
      let send = {
        value: string || [],
        type: "List",
        metadata: JSON.parse(meta)
      };
      obj.push(send);
    }

    if (obj.length !== 0) {
      return obj[0];
    }
    return {
      value: string || [],
      type: "List",
      metadata: {}
    }
  }
  return null;
}

function dateCheckMandatory(date, ext) { // Not in use
  counter += 1;
  if (!date) {
    return null;
  }
  let date_val;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof date === 'object' && date !== null) {
      date_val = isNaN(new Date(date.value).getTime()) ? new Date() : new Date(date.value);
      return {
        value: date_val,
        type: "DateTime",
        metadata: date.metadata || {}
      };
    } else {
      return {
        value: new Date(),
        type: "DateTime",
        metadata: {}
      };
    }
  }
  date_val = isNaN(new Date(date).getTime()) ? new Date() : new Date(date);
  let meta = pos(counter);
  return {
    value: date_val,
    type: "DateTime",
    metadata: meta ? JSON.parse(meta) : {}
  };
}

function dateCheck(date, ext) {
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
      date_val = isNaN(new Date(date.value).getTime()) ? new Date() : new Date(date.value);
      return {
        value: date_val,
        type: "DateTime",
        metadata: date.metadata || {}
      };
    } else {
      return {
        value: new Date(),
        type: "DateTime",
        metadata: {}
      };
    }
  }
  date_val = isNaN(new Date(date).getTime()) ? new Date() : new Date(date);
  let meta = pos(counter);
  return {
    value: date_val,
    type: "DateTime",
    metadata: meta ? JSON.parse(meta) : {}
  }
}


function mandatoryCheck(attribute, ext) { //OK Mandatory String
  counter += 1;
  if (!attribute) {
    return null;
  }
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof attribute === 'object' && attribute !== null) {
      attribute.value = typeof attribute.value === "string" ? attribute.value : "";
      return {
        value: attribute.value || "",
        type: "String",
        metadata: attribute.metadata || {}
      };
    } else {
      return {
        value: "",
        type: "String",
        metadata: {},
      };
    }
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

  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof value === 'object' && value !== null) {
      value.value = typeof value.value === "string" ? value.value : "";
      return {
        "value": value.value || "",
        "type": "String",
        "metadata": value.metadata || {}
      }
    } else {
      return {
        "value": "",
        "type": "String",
        "metadata": {}
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
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === 'object' && string !== null) {
      string.value = Array.isArray(string.value) ? string.value : [];
      string.value = string.value.reduce((finalList, raw) => {
        if (Number(raw) || Number(raw) === 0)
          finalList.push(Number(raw));
        return finalList;
      }, []);
      return {
        value: string.value || [],
        type: "List",
        metadata: string.metadata || {}
      }
    } else {
      return {
        "value": [],
        "type": "List",
        "metadata": {}
      }
    }
  }

  if (string) {
    let obj = [];
    let meta = pos(counter);
    if (meta) {
      obj = [];
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
  if (!string) {
    return null;
  }
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === "object" && string !== null) {
      string.value = Array.isArray(string.value) ? string.value : [];
      string.value = string.value.reduce((finalList, raw) => {
        if (Number(raw) || Number(raw) === 0)
          finalList.push(Number(raw));
        return finalList;
      }, []);
      return {
        value: string.value || [],
        type: "List",
        metadata: string.metadata || {}
      };
    } else {
      return {
        value: [],
        type: "List",
        metadata: {}
      };
    }
  }

  if (string) {
    let obj = [];
    let meta = pos(counter);
    if (meta) {
      obj = [];
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
  counter += 1;
  if (!location) {
    return null;
  }
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof location === 'object' && location !== null) {
      location.value = typeof location.value === "object" && !Array.isArray(location.value) ? location.value : {};
      return {
        // value: location["value"].value,
        // type: "geo:json",
        // metadata: location["value"].metadata
        value: location.value || {},
        type: "geo:json",
        metadata: location.metadata || {}
      }
    } else {
      return {
        value: {},
        type: "geo:json",
        metadata: {}
      }
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
  }
  return null;
}

function locationCheckNoMand(location, ext) { // Optional geo:json
  counter += 1;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof location === "object" && location !== null) {
      location.value = typeof location.value === "object" && !Array.isArray(location.value) ? location.value : {};
      return {
        // value: location["value"].geometry,
        // type: "geo:json",
        // metadata: location.metadata || {}
        value: location.value || {},
        type: "geo:json",
        metadata: location.metadata || {}
      }
    } else {
      return {
        value: {},
        type: "geo:json",
        metadata: {}
      }
    }
  }

  const data = location ? location.substring(location.indexOf('[') + 1, location.indexOf(']')) : "";
  const coordinates = data ? data.split(',', 2) : [];

  let meta = pos(counter);
  if (!data || data.length === 0 || coordinates.length < 2) {
    return {
      value: {},
      type: "geo:json",
      metadata: meta ? JSON.parse(meta) : {}
    };
  }
  const x = Number(coordinates[0]);
  const y = Number(coordinates[1]);
  if (!isNaN(x) && typeof x === 'number' && !isNaN(y) && typeof y === 'number') {
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

  return {
    value: {},
    type: "geo:json",
    metadata: meta ? JSON.parse(meta) : {}
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
  // let data = string ? string.split(',').map(raw => Number(raw.trim()) ? Number(raw.trim()) : 0) : [];
  let data = [];
  if (string) {
    string = string.split(',');
    data = string.reduce((finalList, str) => {
      if (str !== "" && (Number(str) || Number(str) === 0))
        finalList.push(Number(str));
      return finalList;
    }, []);
  }
  return data;
}

function structuredValue(string, ext) {
  counter += 1
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === "object" && string !== null) {
      string.value = typeof string.value === "object" && !Array.isArray(string.value) ? string.value : {};
      return {
        "value": string.value || {},
        "type": "StructuredValue",
        "metadata": string.metadata || {}
      }
    } else {
      return {
        "value": {},
        "type": "StructuredValue",
        "metadata": {}
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
  }

  if (meta) {
    return {
      "value": string_obj || {}, // specCase(string) || {},
      "type": "StructuredValue",
      metadata: JSON.parse(meta)
    };
  }
  return {
    "value": string_obj || {}, // specCase(string) || {},
    "type": "StructuredValue",
    "metadata": {}
  }
}

function structuredValueMandatory(string, ext) {
  counter += 1
  if (!string)
    return null;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === "object" && string !== null) {
      string.value = typeof string.value === "object" && !Array.isArray(string.value) ? string.value : {};
      return {
        "value": string.value || {},
        "type": "StructuredValue",
        "metadata": string.metadata || {}
      }
    } else {
      return {
        "value": {},
        "type": "StructuredValue",
        "metadata": {}
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
  }
  return {
    "value": string_obj, //specCase(string) || "",
    "type": "StructuredValue",
    "metadata": meta ? JSON.parse(meta) : {}
  }
}

function structuredListMandatory(string, ext) {
  counter += 1
  if (!string)
    return null;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === "object" && string !== null) {
      string.value = Array.isArray(string.value) ? string.value : [];
      string.value = string.value.reduce((finalList, raw) => {
        if (typeof raw === "object")
          finalList.push(raw);
        return finalList;
      }, []);
      return {
        "value": string.value || [],
        "type": "List",
        "metadata": string.metadata || {}
      }
    } else {
      return {
        "value": [],
        "type": "List",
        "metadata": {}
      }
    }
  }

  let meta = pos(counter);
  let array = [];
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
    "metadata": meta ? JSON.parse(meta) : {}
  }
}

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

function structuredList(string, ext) {
  counter += 1;
  if (ext && ext.toLowerCase() != ".csv") {
    if (typeof string === "object" && string !== null) {
      string.value = Array.isArray(string.value) ? string.value : [];
      string.value = string.value.reduce((finalList, raw) => {
        if (typeof raw === "object")
          finalList.push(raw);
        return finalList;
      }, []);
      return {
        value: string.value || [],
        type: "List",
        metadata: string.metadata || {}
      };
    } else {
      return {
        value: [],
        type: "List",
        metadata: {}
      };
    }
  }

  let meta = pos(counter);
  let array = [];
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
    metadata: meta ? JSON.parse(meta) : {}
  };
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