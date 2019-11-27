<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">

        <quote-modal @created="fetchQuotes" />

        <signup-form />

        <login-btn />

        <div class="panel panel-default">
          <div class="panel-heading">
            Existing Quotes
          </div>

          <div class="panel-body">
            <search-quote @search="searchQuotes" />
            
            <quote-group 
              :groupedQuotes="groupedQuotes" 
              @updated="fetchQuotes"
              @removed="fetchQuotes"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {groupBy, get, isEmpty} from 'lodash'
  import clientAuth from './auth'
  const authHeaders = clientAuth()

  import QuoteGroup from './components/QuoteGroup'
  import QuoteModal from './components/EdidableQuoteModal'
  import SearchQuote from './components/SearchQuote'
  import LoginBtn from './components/auth/login'
  import SignupForm from './components/auth/signup'

  export default {
    data () {
      return {
        groupedQuotes: {},
        query: ''
      }
    },
    components: { QuoteGroup, QuoteModal, SearchQuote, LoginBtn, SignupForm },
    mounted () {
      this.fetchQuotes()
    },
    methods: {
      fetchQuotes () {
        this.$feathers.service('quotes').find({
            headers: authHeaders
          })
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
        this.$feathers.service('quotes')
        .find({
            query: {
              $or: [
                { text: { $search: query } },
                { author: { $search: query } }
              ],
            },
            headers: authHeaders
        }, {text: 1, author: 1})
          .then( result => {
            const res = get(result, 'data', undefined);
            if (isEmpty(res)) {
              throw new Error('No result found')
            }
            console.log(':=>>', res)
            const filteredRes = res.filter(
              el => {
                const concat = [el.author, el.text].join("").toLowerCase();
                return concat.includes(query.toLowerCase());
              }
            )
            const groupedEntry = groupBy(filteredRes, quote => quote.author)
            this.groupedQuotes = groupedEntry;
          })
          .catch (err => {
            this.groupedQuotes = {};
            console.log(err)
          }).finally(() => {
            this.$store.dispatch('store_query', {query});
            return this.query = query
          })
      }
    },
    feathers: { // here is our section
      quotes: { // here is the subsection for the 'messages' service
        created(data) {
          console.log('created listener data', data)
        },
        updated(data) {
          console.log('updated listener data', data)
        },
        removed(data) {
          console.log('removed listener data', data)
        }
      },
      comments: { // here is the subsection for the 'messages' service
        created(data) {
          console.log('created listener data', data)
        },
        updated(data) {
          console.log('updated listener data', data)
        },
        removed(data) {
          console.log('removed listener data', data)
        }
      },
      authentication: {

      }
    }
  }
</script>

<style lang="scss" scoped>
.container {
  margin-top: 2em;
}
</style>

<style lang="scss">
 .highlight {
    color: white;
    background-color: teal;
    border-radius: 5px;
  }
</style>
