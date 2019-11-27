
export const authHeaders = () => {
    const cred = JSON.parse(window.localStorage.session) || {};
    const headers =  { 
        'X-Requested-With': 'FeathersJS',
        Authorization: `Bearer ${cred.accessToken}`
    }
    return headers
}

export default authHeaders

