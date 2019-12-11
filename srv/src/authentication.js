const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');

module.exports = function () {
  const app = this;
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies),
        // This hook adds userId attribute to the JWT payload
        (hook) => {
          if (!(hook.params.authenticated)) return;
          
          const user = hook.params.user;
          hook.params.payload = hook.params.payload || {}
          Object.assign(hook.params.payload, {
            userId: user._id, 
            iat: Date.now(),
            exp: 3600, 
            token_type: 'Bearer'
          })
        }
      ],
      remove: [
        async (context) => console.log('context before remove', context.params),
        authentication.hooks.authenticate(['jwt', 'local'])
      ]
    },
    after: {
      create: [
        hook => {
          delete hook.params.user.password
          hook.result.user = hook.params.user;
          hook.result.lastLogin = Date.now();
          hook.result.payload = hook.params.payload
        }
      ]
    }
  });
};
