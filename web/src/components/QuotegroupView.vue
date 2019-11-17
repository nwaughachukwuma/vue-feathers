<template>
  <li class="list-group-item well cust-list-group-item">
    <p class="panel-title authorHeader">
      <i class="fa fa-user"></i>
      <b>Author: {{ author }}</b>
    </p>
    <quote-list 
      :quotes="quotes" 
      @quoteClicked="quoteClicked" 
      @updated="$emit('updated')"
      @removed="$emit('removed')"
      :activeQuoteId="activeQuoteId"
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
    author: { type: String, default: 'John Smith'},
    activeQuoteId: { type: String, default: ''}
  },
  methods: {
      quoteClicked({mode, itemId}) {
        this.$emit('onQuoteClicked',{ mode, itemId})
      }
  },
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