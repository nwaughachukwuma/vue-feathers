<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">

        <quote-modal @created="fetchQuotes" />

        <div class="panel panel-default">
          <div class="panel-heading">
            Existing Quotes
          </div>
          
          <div class="form-group">
            <input 
              class="form-control" 
              type="text" 
              placeholder="Search" 
              aria-label="Search"
              @input="searchItems"
            >
          </div>

          <quote-group 
            :groupedQuotes="groupedQuotes" 
            @updated="fetchQuotes"
            @removed="fetchQuotes"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {debounce, groupBy, get, isEmpty} from 'lodash'

  import QuoteGroup from './components/QuoteGroup'
  import QuoteModal from './components/EdidableQuoteModal'

  export default {
    data () {
      return {
        groupedQuotes: {},
        query: ''
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
      searchItems: debounce(function(evt) {
        const query = evt.target.value
        this.searchQuotes({query})
      }, 1000),
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
          }).finally(() => this.query = query)
      }
    }
  }
</script>

<style lang="scss" scoped>
.container {
  margin-top: 2em;
}
.searchField {
  padding-top: 1em;
  justify-content: center;
  text-align: center;
}
</style>
