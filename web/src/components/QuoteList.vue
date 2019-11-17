<template>
  <ul class="list-group" v-if="quotes.length">
    <editable-quote 
      v-for="quote in quotes" 
      :key="quote._id" 
      :authorQuote="quote"
      @isClicked="itemClicked"
      :activeQuoteId="activeQuoteId"
      @updated="$emit('updated')"
    />
  </ul>
  <div class="panel-body" v-else>
    <p>No quotes found.</p>
  </div>
</template>

<script>
  import EditableQuote from './EditableQuote'

  export default {
    components: { EditableQuote },
    props: {
      quotes: { type: Array, default: [] },
      activeQuoteId: { type: String, default: ''}
    },
    methods: {
      itemClicked({mode, itemId}) {
        this.$emit('quoteClicked', {mode, itemId})
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
