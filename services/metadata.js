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
  return igor[position];
};
