import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const logger = () => process.env.NODE_ENV === 'production'? () => {} : createLogger({collapsed: false})
const plugin1 = store => {
    // called when the store is initialized
    store.subscribe((mutation, state) => {
      // called after every mutation.
      // The mutation comes in the format of `{ type, payload }`.
        if (mutation.type === 'store_quoteClicked') {
            // perform side effect from the store when a commit is dispatched or triggered
            // e.g. make a call to an endpoint
            // fetch('https://jsonplaceholder.typicode.com/todos')
            //     .then(response => response.json())
            //     .then(json => {
            //         return store.commit('store_todos', {todos: json})
            //     })
        }
    })
}

export default new Vuex.Store({
    plugins: [logger(), plugin1],
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
})
