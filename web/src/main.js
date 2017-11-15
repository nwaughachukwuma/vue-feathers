import Vue from 'vue'
import Vuex from 'vuex'
import VueFeathers from 'vue-feathers'

import feathersClient from './feathers'
import Entry from './Entry'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'babel-polyfill'

Vue.use(Vuex)
Vue.use(VueFeathers, feathersClient())

const store = new Vuex.Store({
})

// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  store,
  render: h => h(Entry)
})
