const search = require('feathers-mongodb-fuzzy-search')

module.exports = {
  before: {
    all: [
      search(),
      // search({
      //   fields: ['text'], 
      //   escape: false
      // })
    ],
    find: [async context => console.log('archived-quotes find :=>>', context.params)],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
