let temp = [];
let igor = [];

module.exports.set = function (value) {
    igor = [];
    temp = [];
    value.forEach(element => {
        temp.push(element);
        let num = element.test;
        igor[num] = element.name;
    });
};

module.exports.get = function() {
    return temp;
};

module.exports.getIgor = function (position) {
  // console.log("igor[position]=" + igor[position]);
  if (igor[position] && !IsJsonString(igor[position])) { 
    throw "Incorrectly structured metadata.";
  }
  return igor[position];
};

function IsJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}
