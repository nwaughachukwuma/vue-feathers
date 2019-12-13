import feathers from 'feathers/client'
import rest from 'feathers-rest/client'
import hooks from 'feathers-hooks';
import auth from 'feathers-authentication-client'
import $ from 'jquery'
import reactive from 'feathers-reactive'

export default () => {
  const restClient = rest('/rest.api')
 
  // see the options here: 
  // https://docs.feathersjs.com/api/authentication/client.html#configuration 

  const ls = window.localStorage;
  const options = {storageKey: 'feathers-jwt', storage: ls, aud: 'web'}
  const authClient = auth(options);

  const app = feathers();
  app
    .configure(
      hooks({}))
    .configure(restClient.jquery($)) // or .fetch(window.fetch)
    .configure(reactive({
      idField:'_id',
      enableEvents: true
    }))
    .configure(authClient);

  return app
}