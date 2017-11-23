const quotes = require('./quotes/quotes.service.js');
const archivedQuotes = require('./archived-quotes/archived-quotes.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(quotes);
  app.configure(archivedQuotes);
};
