import feathers from 'feathers/client'
import rest from 'feathers-rest/client'
import hooks from 'feathers-hooks';
import auth from 'feathers-authentication-client'
import $ from 'jquery'

// import io from 'socket.io-client'; // /dist/socket.io
// import socketio from 'feathers-socketio/client';

export default () => {
  // configure with socket io
  // const socket = io('/socket.io', { timeout: 4900, transports: ['websocket']}); // http://path/to/api
  const restClient = rest('/rest.api')

  // see the options here: 
  // https://docs.feathersjs.com/api/authentication/client.html#configuration 
  // const ls = window.localStorage;

  const options = {storageKey: 'feathers-app'}
  const authClient = auth(options);

  const app = feathers();
  app
    .configure(hooks({
      // populateHeader: {Authorization: `Bearer ${ls.session.accessToken}`},
      // authentication: [async context => console.log('client context ....>>>>>', context)],
      before: {
        all: [async context => {
          console.log('brower context before ===>', context)
        }]
      }
    }))
    // .configure(socketio(socket))
    .configure(restClient.jquery($))
    .configure(authClient)

  return app
}

