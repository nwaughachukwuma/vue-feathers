<template>
  <ul class="list-group" v-if="!isEmpty(groupedQuotes)">
    <div v-for="(quotes, author) in groupedQuotes" :key="quotes[0]._id">
        <quote-group-view :quotes="quotes" :author="author" />
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
    methods: {
      isEmpty
    }
  }
</script>

<style lang="scss" scoped>
</style>
