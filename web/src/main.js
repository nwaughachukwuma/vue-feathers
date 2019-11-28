import Vue from 'vue'
import Vuex from 'vuex'
import VueFeathers from 'vue-feathers'

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

Vue.use(Vuex)
Vue.use(VueFeathers, feathersClient())

document.addEventListener('storage', console.log('storage updated'));

// const store = new Vuex.Store({ })

// eslint-disable-next-line no-new
var vm = new Vue({
  el: '#root',
  store,
  render: h => h(Entry)
})
