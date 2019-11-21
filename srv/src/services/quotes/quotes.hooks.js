// @ts-check
const { hooksFunction } = require('../../handlers')

// @ts-ignore
module.exports = {
  before: {
    all: [],
    find: [async (context) => {
      console.log('find method context :==> ', context)
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
