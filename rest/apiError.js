const response = require("./defaultResponse");

module.exports = (text) => {
  response.meta.status = 500;
  response.meta.message = text;

  return response;
};
