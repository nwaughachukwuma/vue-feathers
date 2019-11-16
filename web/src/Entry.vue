<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">

        <quote-modal />

        <div class="well" v-show="quoteModal">
          <quote-form @create="fetchQuotes"/>
        </div>

        <div class="panel panel-default">
          <div class="panel-heading">
            Existing Quotes
          </div>
          <quote-group :groupedQuotes="groupedQuotes" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  /**
  |--------------------------------------------------
  | Task 1: Group quotes by authors
  |--------------------------------------------------
  */
  import {groupBy} from 'lodash'

  import QuoteForm from './components/QuoteForm'
  import QuoteGroup from './components/QuoteGroup'
  import QuoteModal from './components/EdidableQuoteModal'

  export default {
    data () {
      return {
        groupedQuotes: {},
        quoteModal: false
      }
    },
    components: { QuoteForm, QuoteGroup, QuoteModal },
    mounted () {
      this.fetchQuotes()
    },
    methods: {
      fetchQuotes () {
        this.$feathers.service('quotes').find()
          .then(result => {
            // get the grouped quotes
            const groupedEntry = groupBy(result.data, quote => quote.author)
            this.groupedQuotes = groupedEntry;
          })
          .catch(() => {
            console.log('An error occurred while retreiving quotes.')
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
.container {
  margin-top: 2em;
}
.addQuote {
  margin-bottom: 1em;
}
</style>
