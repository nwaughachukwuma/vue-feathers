// @ts-check
// @ts-ignore
const search = require('feathers-mongodb-fuzzy-search')
const { hooksFunction } = require('../../handlers')
const {get} = require('lodash')

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
      console.log('quotes find :=>>', context.params.user)
    }],
    get: [],
    create: [async (context) => hooksFunction(context, 'create')],
    update: [async (context) => hooksFunction(context, 'update')],
    patch: [],
    remove: [async context => {
      const userId = get(context.params, 'payload.userId', undefined);
      if (!userId) throw new Error(`You are not permitted to delete this quote`)
      
      // check that quote belongs to the authenticated user
      const dbQuote = await context.app.service('quotes').get(context.id)
      if (dbQuote.userId !== userId) {
        throw new Error(`You are not permitted to delete this quote`) 
      }
    }]
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
