// define a mixin object
const FeathersJSMixin = {
    feathers: { // section for listening to feathers services
        quotes: {
            created(data) {
                console.log('created listener data', data)
            },
            updated(data) {
                console.log('updated listener data', data)
            },
            removed(data) {
                console.log('removed listener data', data)
            }
        },
        comments: {
            created(data) {
                console.log('created listener data', data)
            },
            updated(data) {
                console.log('updated listener data', data)
            },
            removed(data) {
                console.log('removed listener data', data)
            }
        },
        likes: {
            created(data) {
                // console.log('created listener data: likes::', data)
            },
            updated(data) {
                // console.log('updated listener data: likes::', data)
            },
            removed(data) {
                console.log('removed listener data: likes::', data)
            }
        },
        users: {
            find(data) {
                console.log('find users listener: users::', data)
            }
        },
        authentication: {
            async created(data) {
                console.log('authentication listener created', data)
                if (!!data.accessToken) {
                    await this.$store.dispatch('store_session', { session: data })
                    this.userAuth = true
                    this.fetchQuotes();
                }
            },
            updated(data) {
                console.log('authentication listener updated', data)
                this.$store.dispatch('store_session', { session: data })
            },
            removed(data) {
                console.log('authentication listener deleted', data)
                this.$store.dispatch('remove_session');
            }
        }
    }
}

export default FeathersJSMixin