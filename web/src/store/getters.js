import {isEmpty, get} from 'lodash'

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
    },
    headers: state => {
        let cred = JSON.parse(window.localStorage.session || "{}");
        if (isEmpty(cred)) {
            cred = get(state, 'session', {})
        }
        state.session = cred;
        return {
            'X-Requested-With': 'FeathersJS',
            Authorization: `Bearer ${cred.accessToken || ''}`
        }
    }
}

export default getters
