<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="well">
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
  // import QuoteList from './components/QuoteList'
  import QuoteGroup from './components/QuoteGroup'

  export default {
    data () {
      return {
        groupedQuotes: {},
        quotes: []
      }
    },
    components: { QuoteForm, QuoteGroup },
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
            // console.log(this.groupedQuotes)
            this.quotes = result.data
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
</style>
