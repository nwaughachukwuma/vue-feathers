<template>
  <li class="list-group-item well cust-list-group-item">
    <p class="panel-title authorHeader">
      <i class="fa fa-user"></i>
      <b v-html="$options.filters.highlight(author, activeQuery)">
        Author: {{ author}}
      </b>
    </p>
    <quote-list 
      :quotes="quotes" 
      @quoteClicked="quoteClicked" 
      @updated="$emit('updated')"
      @removed="$emit('removed')"
    />
  </li>
</template>

<script>
// col-md-offset-3
import QuoteList from './QuoteList' 
export default {
  components: { QuoteList },
  props: {
    quotes: { type: Array, default: [] },
    author: { type: String, default: 'John Smith'}
  },
  methods: {
    quoteClicked({mode, itemId}) {
      this.$emit('onQuoteClicked',{ mode, itemId})
    }
  },
  computed: {
    activeQuery () {
      return this.$store.state.activeQuery
    }
  }
};
</script>

<style lang="scss" scoped>
  .authorHeader {
      color: teal;
      margin-bottom: 10px;
  }
  .cust-list-group-item {
    margin-bottom: 1em;
  }
</style>