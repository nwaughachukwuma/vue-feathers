const quotes = require('./quotes/quotes.service.js');
const archivedQuotes = require('./archived-quotes/archived-quotes.service.js');
const comments = require('./comments/comments.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(quotes);
  app.configure(archivedQuotes);
  app.configure(comments);
};
