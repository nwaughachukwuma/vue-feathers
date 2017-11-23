<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="exampleInputName">Author name</label>
      <input type="text" class="form-control" id="exampleInputName"
      placeholder="Name" v-model="name">
    </div>
    <div class="form-group">
      <label for="exampleInputQuote">Quote</label>
      <input type="text" class="form-control" id="exampleInputQuote"
      placeholder="Quote" v-model="quote">
    </div>
    <button type="submit" class="btn btn-default">Save quote</button>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        quote: ''
      }
    },
    methods: {
      onSubmit () {
        this.$feathers.service('quotes').create({
          author: this.name,
          text: this.quote
        })
          .then(() => this.$emit('create'))
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
