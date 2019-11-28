<template>
    <div>
        <div class="row">
            <img class="img-responsive" :src="imgSrc" alt="Quote Bg" width="480">
        </div>
        <login-btn v-if="authType==='login'" @switchAuth="switchAuthType" />
        <signup-form v-else @switchAuth="switchAuthType"/>
    </div>
</template>

<script>

import LoginBtn from './login'
import SignupForm from './signup'

const imgSrc = 'https://dl.dropbox.com/s/gj8yfldp2iaok0i/quote_bg.png?dl=0'

export default {
    
    components: {LoginBtn, SignupForm},
    data() {
        return {
            authType: 'login',
            imgSrc: imgSrc
        }
    },
    methods: {
        switchAuthType({type}) {
            this.authType = type === 'login'? 'signup': 'login'
        }
    },

}
</script>