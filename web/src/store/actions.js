export const actions = {
    store_query({commit}, payload) {
        commit('store_query', payload)
    },
    store_quoteId({commit}, payload) {
        commit('store_quoteId', payload)
    },
    store_quoteClicked({commit}, payload) {
        commit('store_quoteClicked', payload)
    }
}

export default actions
