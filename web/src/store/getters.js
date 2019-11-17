export const getters = {
    events: state => {
        return state.events
    },
    free_events: state => {
        return state.events.filter(el => el.type === 'free')
    },
    paid_events: state => {
        return state.events.filter(el => el.type === 'paid')
    },
    users: state => {
        return state.users
    },
    concluded_events: state => {
        return state.concluded_events
    },
    concluded_free_events: state => {
        return state.concluded_events.filter(el => el.type === 'free')
    },
    concluded_paid_events: state => {
        return state.concluded_events.filter(el => el.type === 'paid')
    },
    paidout_events: state => {
        return state.paidout_events
    },
}

export default getters
