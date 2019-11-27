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
            email: 'nnamdi.bruce@gmail.com',
            password: 'supersecret'
        }
    },
    methods: {
        login() {
            this.$feathers.service('authentication')
            .create({
                strategy: "local",
                email: this.email,
                password: this.password
            })
            .then(
                res => {
                    // save to local storage
                    let credentials = {
                        user: {
                            ...res.user
                        }, 
                        accessToken: res.accessToken,
                        lastLogin: Date.now()
                    };
                    credentials = JSON.stringify(credentials)
                    window.localStorage.session = credentials
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
        }
    }
}
</script>