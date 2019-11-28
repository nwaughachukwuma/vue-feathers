<template>
    <button class="btn btn-danger btn-lg btn-block" @click="logout">
        Logout
    </button>
</template>

<script>
import clientAuth from '../../auth' 

export default {
    
    methods: {
        logout() {
            const session = this.$store.state.session || {}
            this.$feathers.service('authentication').remove(session.accessToken, {
                strategy: 'local',
                headers: clientAuth()
            })
            .then(res => {
                    this.$emit('logout');
            })
            .catch(err => console.log('error in logout', err))
        }
    }
}
</script>