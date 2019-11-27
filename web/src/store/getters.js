import {get} from 'lodash'
export const getters = {
    users: state => {
        return state.users
    },
    session: state => {
        return state.session
    },
    user: state => {
        console.log('getters', state.session);
        return get(state.session, 'user', undefined)
    }
}

export default getters
