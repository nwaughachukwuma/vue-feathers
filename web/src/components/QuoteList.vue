<template>
  <ul class="list-group" v-if="quotes.length">
    <quote-item v-for="quote in quotes" :key="quote._id" :quote="quote"/>
  </ul>
  <div class="panel-body" v-else>
    <p>No quotes found.</p>
  </div>
</template>

<script>
  import QuoteItem from './QuoteItem'

  export default {
    components: { QuoteItem },
    props: {
      quotes: { type: Array, default: [] }
    }
  }
</script>

<style lang="scss" scoped>
</style>
