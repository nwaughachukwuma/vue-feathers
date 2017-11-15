<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="exampleInputName">Your name</label>
      <input type="text" class="form-control" id="exampleInputName"
      placeholder="Name" v-model="name">
    </div>
    <div class="form-group">
      <label for="exampleInputTheorem">Theorem</label>
      <input type="text" class="form-control" id="exampleInputTheorem"
      placeholder="Theorem" v-model="theorem">
    </div>
    <button type="submit" class="btn btn-default">Save theorem</button>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        theorem: ''
      }
    },
    methods: {
      onSubmit () {
        this.$feathers.service('theorems').create({
          author: this.name,
          text: this.theorem
        })
          .then(() => this.$emit('create'))
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
