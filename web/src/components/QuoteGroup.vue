<template>
  <ul class="list-group" v-if="!isEmpty(groupedQuotes)">
    <div v-for="(quotes, author) in groupedQuotes" :key="quotes[0]._id">
      <quote-group-view 
          :quotes="quotes" 
          :author="author" 
          @updated="$emit('updated')"
          @removed="$emit('removed')"
      />
    </div>
  </ul>
  <p v-else>No quotes found.</p>
</template>

<script>
  import QuoteGroupView from './QuoteGroupView'
  import { debounce, isEmpty, groupBy } from 'lodash'

  export default {
    components: { QuoteGroupView },
    props: {
      groupedQuotes: { type: Object, default: {}}
    },
    methods: {
      isEmpty,
      searchItems: debounce(function(evt) {
        const query = evt.target.value
        this.$emit('search', {query})
      }, 1000)
    }
  }
</script>

<style lang="scss" scoped>
</style>
