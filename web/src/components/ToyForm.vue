<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="exampleInputName">Your name</label>
      <input type="text" class="form-control" id="exampleInputName" placeholder="Name">
    </div>
    <div class="form-group">
      <label for="exampleInputTheorem">Theorem</label>
      <input type="text" class="form-control" id="exampleInputTheorem" placeholder="Theorem">
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox"> Check me out
      </label>
    </div>
    <button type="submit" class="btn btn-default">Save theorem</button>
  </form>
</template>

<script>
  export default {
    mounted () {
    },
    methods: {
      onSubmit () {
        this.$feathers.service('theorems').create({
          author: this.name,
          text: this.theorem
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
