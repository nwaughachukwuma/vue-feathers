import Vue from 'vue'
import Vuex from 'vuex'
import VueFeathers from 'vue-feathers'
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import { get } from 'lodash'

import store from './store'
import feathersClient from './feathers'
import Entry from './Entry'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'babel-polyfill'

// highlight filter
Vue.filter('highlight', function(word, query){
  var check = new RegExp(query, "ig");
  return word.toString().replace(check, function(matchedText, a, b){
      return ('<span class=\'text-danger highlight\'>' + matchedText + '</span>');
  });
});

// const SocketInstance = socketio('http://localhost:8380');

// configure vue-socket.io
const ls = window.localStorage;
const SocketInstance = socketio('http://localhost:8380', {
  transports: ['websocket' , 'polling'], 
  forceNew: true,
  extraHeaders: {
    Authorization: `Bearer ${get(ls, 'feathers-jwt', '')}`
  },
  query: {
    token: ls.getItem('feathers-jwt')
  }
});

Vue.use(new VueSocketIO({
  debug: false,
  connection: SocketInstance,
  vuex: store
}));

Vue.use(Vuex)
Vue.use(VueFeathers, feathersClient())

// const store = new Vuex.Store({ })

// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  store,
  render: h => h(Entry)
})
