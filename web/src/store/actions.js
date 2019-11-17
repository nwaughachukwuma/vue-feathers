export const actions = {
    store_query({commit}, payload) {
        commit('store_query', payload)
    },
    store_quoteId({commit}, payload) {
        commit('store_quoteId', payload)
    },
}

export default actions
