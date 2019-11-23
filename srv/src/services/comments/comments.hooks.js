

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [async context => {
      context.data.createdAt = Date.now();
      const data = context.data
      console.log(data)
      if (!data || !data.quoteId) {
        throw new Error('Please specify the quote this comment belongs to')
      }
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
