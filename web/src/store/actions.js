export const actions = {
    store_events({commit}, payload) {
        commit('store_events', payload)
    },
    store_concluded_events({commit}, payload) {
        commit('store_concluded_events', payload)
    },
    store_paidout_events({commit}, payload) {
        commit('store_paidout_events', payload)
    },
    store_users({commit}, payload) {
        commit('store_users', payload)
    },
}

export default actions
