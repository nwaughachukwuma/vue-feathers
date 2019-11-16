<template>
  <li class="list-group-item">
    <form @submit.prevent="onSubmit" v-if="displayMode==='edit'">
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
            :placeholder="'Quote'" 
            v-model="quote"
        >
        </div>
        <button type="submit" class="btn btn-default">Save quote</button>
        <button 
            type="button" 
            class="btn btn-warning" 
            v-show="disableAuthorField"
            @click="toggleMode"
        >
            Dismiss
        </button>
    </form>
    <div @click="toggleMode" v-else>
        <p >
            <i class="fa fa-quote-left"></i>
            {{ authorQuote.text }}
        </p>
    </div>
  </li>
</template>

<script>
  export default {
    props: {
      authorQuote: { type: Object, default: () => ({text: ''}) },
      mode: { type: String, default: 'display'} // ['display', 'edit']
    },
    data () {
      return {
        name: '',
        quote: '',
        displayMode: '',
        disableAuthorField: false
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
        this.displayMode =  this.displayMode === 'edit'? 'display': 'edit'

        if (this.displayMode === 'edit') {
            this.disableAuthorField = true
        }
      }
    },
    watch: {
        mode: {
            handler(val) {
                this.displayMode = val;
            },
            immediate: true
        },
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
