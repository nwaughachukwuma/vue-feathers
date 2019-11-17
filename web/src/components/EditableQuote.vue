<template>
  <li class="list-group-item">
    {{activeQuoteId}}
    <edit-quote 
        v-if="displayMode==='edit'" 
        :authorQuote="authorQuote" 
        :disableAuthorField="disableAuthorField" 
        @toggleMode="toggleMode"
        @updated="$emit('updated')"
        @created="$emit('created')"
    />
    <display-quote 
        :authorQuote="authorQuote" 
        @toggleMode="toggleMode" 
        v-else 
        @remove="deleteQuote"
    />
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
      },
      deleteQuote() {
          this.$feathers.service('quotes').remove(this.authorQuote._id)
            .then(() => this.$emit('removed'))
            .catch((err) => console.log('error removing quote: ', error))
      }
    },
    computed: {
      activeQuoteId () {
        const activeQuoteId = this.$store.state.activeQuoteId
        if (this.authorQuote._id !== activeQuoteId) {
            this.displayMode = 'display';
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
