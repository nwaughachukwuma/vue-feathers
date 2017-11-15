// Initializes the `theorems` service on path `/theorems`
const createService = require('feathers-mongodb');
const hooks = require('./theorems.hooks');
const filters = require('./theorems.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/theorems', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('theorems');

  mongoClient.then(db => {
    service.Model = db.collection('theorems');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
