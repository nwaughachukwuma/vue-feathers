<template>
  <ul class="panel-body list-group" v-if="!isEmpty(groupedQuotes)">
    <span class="list-group-item">
      <input 
        class="form-control" 
        type="text" 
        placeholder="Search" 
        aria-label="Search"
        @input="searchItems"
      >
    </span>
    <div v-for="(quotes, author) in groupedQuotes" :key="quotes[0]._id">
        <quote-group-view 
            :quotes="quotes" 
            :author="author" 
            @onQuoteClicked="quoteClicked" 
            @updated="$emit('updated')"
            @removed="$emit('removed')"
            :activeQuoteId="activeQuoteId"
        />
    </div>
  </ul>
  <div class="panel-body" v-else>
    <p>No quotes found.</p>
  </div>
</template>

<script>
  import QuoteGroupView from './QuoteGroupView'
  import { debounce, isEmpty, groupBy } from 'lodash'

  export default {
    components: { QuoteGroupView },
    props: {
      groupedQuotes: { type: Object, default: {}}
    },
    data() {
        return {
            activeQuoteId: null
        }
    },
    methods: {
      isEmpty,
      quoteClicked({mode, itemId}) {
        this.activeQuoteId = itemId
      },
      searchItems: debounce(function(evt) {
        const query = evt.target.value
        this.$emit('search', {query})
      }, 1000)
    }
  }
</script>

<style lang="scss" scoped>
</style>
