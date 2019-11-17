export const mutations = {
    store_events(state, {events}) {
        state.events = events
    },
    store_concluded_events(state, {concluded_events}) {
        state.concluded_events = concluded_events
    },
    store_paidout_events(state, {paidout_events}) {
        state.paidout_events = paidout_events
    },
    store_users(state, {users}) {
        state.users = users
    },
}

export default mutations
