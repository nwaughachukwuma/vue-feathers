<template>
    <div>
        <button class="btn btn-primary" @click="login">
            Login
        </button>
    </div>
</template>


<script>
export default {
    props: {},
    data() {
        return {
            email: 'nnamdi@email.com',
            password: 'secret'
        }
    },
    methods: {
        login() {
            this.$feathers.service('authentication').create({
                strategy: "local",
                email: this.email,
                password: this.password
            })
            .then(
                res => console.log('result of logging in :=>> ', res)
            )
            .catch(
                err => console.log('error on logging in :=>> ', err)
            )
        }
    }
}
</script>