<template>
  <transition-group 
    name="list-group-transition" 
    class="list-group" 
    tag="ul" 
    v-if="quotes.length"
  >
    <!-- <ul class="list-group" v-if="quotes.length"> -->
      <editable-quote 
        v-for="quote in quotes" 
        :key="quote._id" 
        :authorQuote="quote"
        @isClicked="itemClicked"
        @updated="$emit('updated')"
        @removed="$emit('removed')"
      />
    <!-- </ul> -->
  </transition-group>
  <p v-else>No quote found.</p>
</template>

<script>

  import EditableQuote from './EditableQuote'

  export default {
    components: { EditableQuote },
    props: {
      quotes: { type: Array, default: [] }
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
.list-group-item {
  transition: all 1s;
}

.list-group-transition-enter, .list-group-transition-leave-to
/* .list-group-transition-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-group-transition-leave-active {
  position: absolute;
}
</style>
