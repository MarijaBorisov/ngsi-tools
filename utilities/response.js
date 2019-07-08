module.exports = (x, y) => ({
  type: "geo:point",
  coordinates: [ x, y ],
});

module.exports.resposneResult = (result, action) => {
  const data = [];
  result.forEach((element) => {
    data.push({
      status: [ {
        type: element.type ? element.type : "Unknown",
        description: {
          id: element.id ? element.id : "Unknown",
        },
        actions: [ {
          error: "",
          status: "SUCCESS",
          type: action,
        } ],
      } ],
    });
  });
  return data;
};
