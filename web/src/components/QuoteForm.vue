<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
    <label :for="disableAuthorField? 'inputDsblName':'inputName'">Author name</label>
    <input 
        type="text" 
        class="form-control" 
        id="inputName"
        placeholder="Name" 
        v-model="name"
        v-show="!disableAuthorField"
        required
    >
    <input 
        type="text" 
        class="form-control" 
        id="inputDsblName"
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
      required
    >
    </div>
    <button type="submit" class="btn btn-primary" v-show="!disableAuthorField">
      Save quote
    </button>
    <button type="button" class="btn btn-warning" v-show="disableAuthorField"
        @click="toggleMode">
        Dismiss
    </button>
    <small class="text-muted" v-if="typing==='updating'">
      <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
    </small>
    <loopy-button />
  </form>
</template>

<script>

  import { debounce, throttle, isEmpty } from 'lodash'
  import LoopyButton from './LoopyButton'

  export default {
    components: {LoopyButton},
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
        if (isEmpty(this.name) || isEmpty(this.quote)) return;
        this.$feathers.service('quotes').create({
          author: this.name,
          text: this.quote
        })
          .then(() => {
            this.name = ''
            this.quote = ''
            this.$emit('created')
          })
          .catch(err => console.log(err))
      },

      updateQuote () {
        if (isEmpty(this.quote)) return;
        this.typing = 'updating'
        this.$feathers.service('quotes').update(this.authorQuote._id, {
          author: this.authorQuote.author,
          text: this.quote,
          edited: true,
          updatedAt: Date.now()
        })
          .then((res) => {
            this.typing = 'updated'
            return this.$emit('updated')
          })
          .catch( (err) => {
            console.error(err)
            alert(err.message)
            this.typing = 'update failed'
          })
      },

      editQuote: debounce(function(event) {
        if (!this.disableAuthorField) return;
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
