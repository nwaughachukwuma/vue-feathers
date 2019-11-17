<template>
  <ul class="list-group" v-if="quotes.length">
    <editable-quote 
      v-for="quote in quotes" 
      :key="quote._id" 
      :authorQuote="quote"
      @isClicked="itemClicked"
      @updated="$emit('updated')"
      @removed="$emit('removed')"
      :activeQuoteId="activeQuoteId"
      :activeQuery="activeQuery"
    />
  </ul>
  <p v-else>No quote found.</p>
</template>

<script>

  import EditableQuote from './EditableQuote'

  export default {
    components: { EditableQuote },
    props: {
      quotes: { type: Array, default: [] },
      activeQuoteId: { type: String, default: ''},
      activeQuery: { type: String, default: ''}
    },
    methods: {
      itemClicked({mode, itemId}) {
        this.$emit('quoteClicked', {mode, itemId})
      },
      quoteCreated() {
        console.log('am called')
        this.$emit('created')
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
