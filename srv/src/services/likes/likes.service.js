// Initializes the `likes` service on path `/likes`
const createService = require('feathers-mongodb');
const hooks = require('./likes.hooks');
const filters = require('./likes.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/likes', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('likes');

  mongoClient.then(db => {
    service.Model = db.collection('likes');

    try {
      service.Model.createIndex({ status: 1 });
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
