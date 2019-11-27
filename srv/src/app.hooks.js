// Application hooks that run for every service
const logger = require('./hooks/logger');
const { authenticate } = require('feathers-authentication').hooks;
const { iffElse } = require('feathers-hooks-common');
const { get } = require('lodash');
const decode = require('jwt-decode');
// https://feathers-plus.github.io/v1/feathers-hooks-common


const serviceType = noAuthPaths => (hook) => noAuthPaths.includes(hook.path)

module.exports = {
  before: {
    all: [
      async context => {
        // const headers = context.params.headers;
        // const bearer_token = get(headers, 'authorization');
        // if (bearer_token) {
        //   const token = bearer_token.split(' ').pop()
        //   const userAuth = decode(token);
        //   // context.data.userId = userAuth.userId
        //   console.log('+++++++', context.data)
        // }
      },
      iffElse(serviceType(['users']), null, authenticate('jwt')),
      // authenticate('jwt'),
      // Do not edit - This introduces a delay to external calls intended to cause race conditions
      (hook) => hook.params.provider
        ? new Promise((resolve) => setTimeout(() => { resolve(hook) }, Math.random()*200))
        : hook
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [async (context) => {
      console.error(
        `Error in '${context.path}' service method '${context.method}'`, 
        context.error.stack
      );
    }],
    patch: [],
    remove: []
  }
};
