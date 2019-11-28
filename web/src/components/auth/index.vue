<template>
    <div>
        <login-btn v-if="authType==='login'" @switchAuth="switchAuthType" />
        <signup-form v-else @switchAuth="switchAuthType"/>
    </div>
</template>

<script>

import LoginBtn from './login'
import SignupForm from './signup'

export default {
    
    components: {LoginBtn, SignupForm},
    data() {
        return {
            authType: 'login'
        }
    },
    methods: {
        switchAuthType({type}) {
            this.authType = type === 'login'? 'signup': 'login'
        }
    },

}
</script>