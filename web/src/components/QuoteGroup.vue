<template>
  <ul class="list-group" v-if="!isEmpty(groupedQuotes)">
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
  import { isEmpty } from 'lodash'

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
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
