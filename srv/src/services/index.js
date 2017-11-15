const theorems = require('./theorems/theorems.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(theorems);
};
