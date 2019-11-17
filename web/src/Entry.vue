<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">

        <quote-modal @created="fetchQuotes" />

        <div class="panel panel-default">
          <div class="panel-heading">
            Existing Quotes
          </div>
          <quote-group 
            :groupedQuotes="groupedQuotes" 
            @updated="fetchQuotes"
            @removed="fetchQuotes"
            @search="searchQuotes"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {groupBy, get, isEmpty} from 'lodash'

  import QuoteGroup from './components/QuoteGroup'
  import QuoteModal from './components/EdidableQuoteModal'

  export default {
    data () {
      return {
        groupedQuotes: {}
      }
    },
    components: { QuoteGroup, QuoteModal },
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
      },
      searchQuotes({query}) {
        this.$feathers.service('quotes').find({$text: {$search: query}})
          .then( result => {
            const res = get(result, 'data', undefined);
            if (isEmpty(res)) {
              throw new Error('No result found')
            }
            const filteredRes = res.filter(
              el => el.author.includes(query) || el.text.includes(query)
            )
            const groupedEntry = groupBy(filteredRes, quote => quote.author)
            this.groupedQuotes = groupedEntry;
          })
          .catch (err => {
            this.groupedQuotes = {};
            console.log(err)
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
