import { get } from 'lodash'
import store from './store'

export function authHeaders() {
    const cred = get(store.state, 'session', {});
    const headers =  { 
        'X-Requested-With': 'FeathersJS',
        Authorization: `Bearer ${cred.accessToken}`
    }
    return headers
}

export default authHeaders

