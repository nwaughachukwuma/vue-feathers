<template>
  <li class="list-group-item">
    <edit-quote 
        v-if="displayMode==='edit'" 
        :authorQuote="authorQuote" 
        :disableAuthorField="disableAuthorField" 
        @toggleMode="toggleMode"
    />
    <display-quote :authorQuote="authorQuote" @toggleMode="toggleMode" v-else />
  </li>
</template>

<script>

  import DisplayQuote from './QuoteItem'
  import EditQuote from './QuoteForm'

  export default {
    components: { DisplayQuote, EditQuote },
    props: {
      authorQuote: { type: Object, default: () => ({text: ''}) },
      mode: { type: String, default: 'display'}, // ['display', 'edit']
      activeQuoteId: { type: String, default: ''}
    },
    data () {
      return {
        displayMode: '',
        disableAuthorField: false
      }
    },
    methods: {
      toggleMode({mode, itemId}) {
        this.$emit('isClicked', {mode, itemId})
        this.displayMode = mode;
        if (mode === 'edit') {
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
        },
        activeQuoteId: {
            handler(val) {
                if (this.authorQuote._id !== val) {
                    this.displayMode = 'display';
                }
            },
            immediate: false
        }
    }
  }
</script>

<style lang="scss" scoped>
</style>
