// Application hooks that run for every service
const logger = require('./hooks/logger');

module.exports = {
  before: {
    all: [
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
    update: [],
    patch: [],
    remove: []
  }
};
