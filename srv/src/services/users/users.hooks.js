const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner, setField } = require('feathers-authentication-hooks');
const search = require('feathers-mongodb-fuzzy-search')

const { hashPassword } = require('feathers-authentication-local').hooks;
const restrict = [
  authenticate('jwt'),
  // restrictToOwner({
  //   idField: '_id',
  //   ownerField: '_id'
  // })
  setField({
    from: 'params.user._id',
    as: 'params.query.userId'
  })
];

module.exports = {
  before: {
    all: [
      search(),
      search({
        fields: ['email'], 
        escape: false
      })
    ],
    find: [ authenticate('jwt') ],
    get: [ ...restrict ],
    create: [hashPassword(), async context => {
      // check if the same email already exists
      const existingUser = await context.app.service('users')
      .find({
          query: {email: { $search: context.data.email }},
        }, {email: 1}
      );
      if (existingUser.data.length) {
        throw new Error('Email address already exists');
      }
      context.data.avatar = "https://s.gravatar.com/avatar/ffe2a09df37d7c646e974a2d2b8d3e03?s=60"
      return;
    }],
    update: [ ...restrict, hashPassword() ],
    patch: [ ...restrict, hashPassword() ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
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
