// Initializes the `quotes` service on path `/quotes`
const createService = require('feathers-mongodb');
const hooks = require('./quotes.hooks');
const filters = require('./quotes.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/quotes', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('quotes');

  mongoClient.then(db => {
    service.Model = db.collection('quotes');
    // create index on archived quotes collections
    try {
      service.Model.createIndex({ text: 'text', author: 'text' })
    } catch (error) {
      console.warn('error creating index')
      console.error(error)
    }
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
