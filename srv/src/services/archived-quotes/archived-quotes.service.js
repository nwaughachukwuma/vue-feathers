// Initializes the `archived_quotes` service on path `/archived-quotes`
const createService = require('feathers-mongodb');
const hooks = require('./archived-quotes.hooks');
const filters = require('./archived-quotes.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/archived-quotes', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('archived-quotes');

  mongoClient.then(db => {
    service.Model = db.collection('archived-quotes');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
