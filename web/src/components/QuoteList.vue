<template>
  <ul class="list-group" v-if="quotes.length">
    <editable-quote v-for="quote in quotes" :key="quote._id" :authorQuote="quote"/>
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
      quotes: { type: Array, default: [] }
    }
  }
</script>

<style lang="scss" scoped>
</style>
