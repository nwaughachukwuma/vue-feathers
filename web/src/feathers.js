import feathers from 'feathers/client'
import rest from 'feathers-rest/client'
import hooks from 'feathers-hooks';
import auth from 'feathers-authentication-client'
import $ from 'jquery'
import reactive from 'feathers-reactive'
import {get} from 'lodash'

export default () => {
  const restClient = rest('/rest.api')
 
  // see the options here: 
  // https://docs.feathersjs.com/api/authentication/client.html#configuration 
  const ls = window.localStorage;

  const options = {storageKey: 'feathers-jwt', storage: ls, aud: 'web'}
  const authClient = auth(options);

  const app = feathers();
  app
    .configure(hooks({
      populateHeader: {Authorization: `Bearer ${get(ls, 'feathers-jwt', '')}`},
      authentication: [async context => console.log('client context ....>>>>>', context)],
      before: {
        all: [async context => {
          console.log('brower context before ===>', context)
        }]
      }
    }))
    // .configure(restClient.jquery($))
    .configure(restClient.fetch(window.fetch))
    .configure(reactive({idField:'_id'}))
    .configure(authClient)

  return app
}

