// @ts-check
// @ts-ignore
const search = require('feathers-mongodb-fuzzy-search')
const { hooksFunction } = require('../../handlers')

// @ts-ignore
module.exports = {
  before: {
    all: [
      search(),
      search({
        fields: ['text', 'author'], 
        escape: false
      })
    ],
    find: [async context => {
      console.log('quotes find :=>>', context.params)
    }],
    get: [],
    create: [async (context) => hooksFunction(context, 'create')],
    update: [async (context) => hooksFunction(context, 'update')],
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
