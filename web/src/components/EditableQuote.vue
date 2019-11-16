<template>
  <form @submit.prevent="onSubmit" v-if="mode==='edit'">
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
  <li class="list-group-item" v-else>
    <p>
      <i class="fa fa-quote-left"></i>
      {{ authorQuote.text }}
    </p>
  </li>
</template>

<script>
  export default {
    props: {
      authorQuote: { type: Object, default: null },
      mode: { type: String, default: 'display'} // ['display', 'edit']
    },
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
    },
    watch: {
        mode(val) {

        }
    }
  }
</script>

<style lang="scss" scoped>
</style>
