// Initializes the `comments` service on path `/comments`
const createService = require('feathers-mongodb');
const hooks = require('./comments.hooks');
const filters = require('./comments.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/comments', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('comments');

  mongoClient.then(db => {
    service.Model = db.collection('comments');
    // create index on archived quotes collections
    try {
      service.Model.createIndex({ text: 'text', author: 'text' });
      service.Model.createIndex({ quoteId: 1 });
      // we'd need userId
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
