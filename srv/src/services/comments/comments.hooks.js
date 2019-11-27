const {get} = require('lodash')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [async context => {
      
      context.data.createdAt = Date.now();
      const userId = get(context.params, 'payload.userId', undefined);
      const quoteId = get(context.data, 'quoteId', undefined)
      if (!quoteId || !userId) {
        throw new Error('Please specify the quote this comment belongs to')
      }
      context.data.userId = userId;
    }],
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
