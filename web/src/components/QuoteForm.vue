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
    <input 
      type="text" 
      class="form-control" 
      id="inputQuote" 
      placeholder="Quote" 
      v-model="quote"
      @input="editQuote"
    >
    </div>
    <button type="submit" class="btn btn-default" v-show="!disableAuthorField">
      Save quote
    </button>
    <button type="button" class="btn btn-warning" v-show="disableAuthorField"
        @click="toggleMode">
        Dismiss
    </button>
    <small class="text-muted" v-if="typing==='updating'">{{typing}}...</small>
  </form>
</template>

<script>

  import { debounce, throttle } from 'lodash'

  export default {
    props: {
      authorQuote: { type: Object, required: true },
      disableAuthorField: { type: Boolean, default: false}
    }, 
    data () {
      return {
        name: '',
        quote: '',
        typing: ''
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

      updateQuote () {
        this.typing = 'updating'
        this.$feathers.service('quotes').update(this.authorQuote._id, {
          author: this.authorQuote.author,
          text: this.quote,
          edited: true
        })
          .then((res) => {
            this.typing = 'updated'
            return this.$emit('updated')
          })
          .catch( (err) => {
            console.error(err)
            this.typing = 'update failed'
          })
      },

      editQuote: debounce(function(event) {
          this.updateQuote()
      }, 1000),
      toggleMode() {
        this.$emit('toggleMode', {mode: 'display', itemId: this.authorQuote._id})
      },
      saveEdit() {
        console.log(this.quote)
      }
    },
    watch: {
      authorQuote: {
        handler(val) {
            this.quote = val.text;
        },
        immediate: true
      },
      quote: {
        handler(val) {
          this.typing = 'You are typing'
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
