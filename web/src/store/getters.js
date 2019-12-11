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
            // get access token from auth-storageKey
            const jwt = get(window.localStorage, 'feathers-jwt', '');
            const sessionState = jwt? {accessToken: jwt}: {}
            cred = get(state, 'session', sessionState)
        }
        state.session = cred;
        return {
            'X-Requested-With': 'FeathersJS',
            Authorization: `Bearer ${cred.accessToken || ''}`
        }
    }
}

export default getters
