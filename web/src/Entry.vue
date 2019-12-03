<template>
  <div class="container">

    <div class="row" v-if="!userAuth">
      <div class="col-xs-6 col-md-6 col-xs-offset-3 col-md-offset-3">
        <auth-logic />
      </div>
    </div>

    <div class="row" v-else>
      <div class="col-md-6 col-md-offset-3">

        <quote-modal @created="fetchQuotes" />

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
        <logout-btn @logout="logout" />
      </div>
    </div>
  </div>
</template>

<script>
  import {groupBy, get, isEmpty} from 'lodash'
  import clientAuth from './auth'

  import QuoteGroup from './components/QuoteGroup'
  import QuoteModal from './components/EdidableQuoteModal'
  import SearchQuote from './components/SearchQuote'
  import AuthLogic from './components/auth'
  import LogoutBtn from './components/auth/logoutBtn'

  import FeathersJSMixin from './mixins/feather'

  export default {
    mixins: [FeathersJSMixin],
    data () {
      return {
        groupedQuotes: {},
        query: '',
        userAuth: false,
      }
    },
    components: { QuoteGroup, QuoteModal, SearchQuote, AuthLogic, LogoutBtn },
    mounted () {
      this.headers; // needed to rehydrate session on the store
      const session = this.$store.state.session;
      if (isEmpty(session)) {
        return
      }
      this.userAuth = true;
      this.fetchQuotes()
    },
    computed: {
      headers() {
        return this.$store.getters.headers;
      }
    },
    methods: {
      fetchQuotes () {
        this.$feathers.service('quotes').find({
            headers: clientAuth()
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
            headers: clientAuth()
        }, {text: 1, author: 1})
          .then( result => {
            const res = get(result, 'data', undefined);
            if (isEmpty(res)) {
              throw new Error('No result found')
            }
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
      },
      logout() {
        this.userAuth = false;
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
