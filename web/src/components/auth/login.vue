<template>
    <div class="row">
        <h2>User Login</h2>
        <form @submit.prevent="login" :key="'signUpForm'">
            <div class="form-group">
                <label for="uLoginEmail">Email</label>
                <input 
                    type="email" 
                    class="form-control" 
                    id="uLoginEmail"
                    placeholder="user@example.com" 
                    v-model="email"
                    required
                >
            </div>
            <div class="form-group">
                <label for="uLoginPassword">Password</label>
                <input 
                    type="password" 
                    class="form-control" 
                    id="uLoginPassword" 
                    placeholder="" 
                    v-model="password"
                    required
                >
            </div>
            <button type="submit" class="btn btn-primary">
                Login
            </button>
        </form>
        <p class="">
            Don't have an account?
            <button class="btn btn-default" @click="switchAuth">
                Create Account
            </button>
        </p>
    </div>
</template>


<script>
export default {
    props: {},
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            if (!this.email.length || !this.password.length) return
            this.$feathers.service('authentication')
            .create({
                strategy: "local",
                email: this.email,
                password: this.password
            })
            .then(
                res => {
                    let credentials = {
                        ...res,
                        user: {...res.user}, 
                        accessToken: res.accessToken,
                    };
                    this.$store.dispatch('store_session', {session: credentials})
                    console.log(res);
                }
            )
            .catch(
                err => {
                    alert('Login Error: ' + err.message)
                    window.localStorage.removeItem("session")
                    console.log('error on logging in :=>> ', err)
                }
            )
        },
        switchAuth() {
            this.$emit('switchAuth', {type: 'login'})
        }
    }
}
</script>