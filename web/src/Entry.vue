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
          <quote-list :quotes="quotes"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import QuoteForm from './components/QuoteForm'
  import QuoteList from './components/QuoteList'

  export default {
    data () {
      return {
        quotes: []
      }
    },
    components: { QuoteForm, QuoteList },
    mounted () {
      this.fetchQuotes()
    },
    methods: {
      fetchQuotes () {
        this.$feathers.service('quotes').find()
          .then(result => {
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
