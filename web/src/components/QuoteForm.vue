<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
    <label for="inputName">Author name</label>
    <input 
        type="text" 
        class="form-control" 
        id="inputName"
        placeholder="Name" 
        v-model="name"
        v-show="!disableAuthorField"
    >
    <input 
        type="text" 
        class="form-control" 
        id="inputName"
        :placeholder="authorQuote.author" 
        v-model="name"
        :disabled="true"
        v-show="disableAuthorField"
    >
    </div>
    <div class="form-group">
    <label for="inputQuote">Quote</label>
    <input type="text" class="form-control" id="inputQuote" placeholder="Quote" 
        v-model="quote">
    </div>
    <button type="submit" class="btn btn-default">Save quote</button>
    <button type="button" class="btn btn-warning" v-show="disableAuthorField"
        @click="toggleMode">
        Dismiss
    </button>
  </form>
</template>

<script>
  export default {
    props: {
      authorQuote: { type: Object, required: true },
      disableAuthorField: { type: Boolean, default: false}
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
      },
      toggleMode() {
        this.$emit('toggleMode', {mode: 'display', itemId: this.authorQuote._id})
      }
    },
    watch: {
      authorQuote: {
        handler(val) {
            this.quote = val.text;
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
