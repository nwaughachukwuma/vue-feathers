<template>
  <div class="row">
    <h2>Create Account</h2>
    <form @submit.prevent="createAccount" :key="'signUpForm'">
    <div class="form-group">
        <label for="uName">Full name</label>
        <input 
            type="text" 
            class="form-control" 
            id="uName" 
            v-model="name"
            required
        >
    </div>
    <div class="form-group">
    <label for="uEmail">Email</label>
    <input 
        type="email" 
        class="form-control" 
        id="uEmail"
        placeholder="user@example.com" 
        v-model="email"
        required
    >
    </div>
    <div class="form-group">
        <label for="uPassword">Password</label>
        <input 
            type="password" 
            class="form-control" 
            id="uPassword" 
            placeholder="more than 6 digits" 
            v-model="password"
            required
        >
    </div>
    <button type="submit" class="btn btn-primary">
      SignUp
    </button>
  </form>

    <p class="">
        Already have an account?
        <button class="btn btn-default" @click="switchAuth">
            Login
        </button>
    </p>
  </div>
</template>

<script>
import { isEmpty } from "lodash";

export default {
  name: "SignupForm",
  data() {
    return {
      email: "",
      password: "",
      name: ""
    };
  },
  methods: {
    createAccount() {
      const { email, password, name } = this;
      if (!email.length || !password.length || !name.length) {
        alert("enter all fields");
        return;
      }
      this.$feathers
        .service("users")
        .create({
          name,
          email,
          password
        })
        .then(res => {
            const gotoLogin = confirm('New account created. Go to Login?')
            if (gotoLogin) this.switchAuth()
        })
        .catch(err => alert(err.message));
    },
    switchAuth() {
      this.$emit("switchAuth", { type: "signup" });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
