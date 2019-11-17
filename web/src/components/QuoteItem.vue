<template>
  <div @click="toggleMode">
    <button class="btn pull-right" @click="deleteQuote">
      <i class="fa fa-trash deleteIcon"></i>
    </button>
    <p>
      <i class="fa fa-quote-left"></i>
      <label v-html="$options.filters.highlight(authorQuote.text, activeQuery)">
        {{ authorQuote.text }}
      </label>
    </p>
    <small class="text-primary" v-if="authorQuote.edited"> 
      <i class="fa fa-clock-o"></i> updated
      {{ authorQuote.updatedAt && dateUtil(authorQuote.updatedAt) }}
    </small>
  </div>
</template>

<script>
  export default {
    props: {
      authorQuote: { type: Object, required: true },
    },
    methods: {
      toggleMode() {
        this.$emit('toggleMode', {mode: 'edit', itemId: this.authorQuote._id})
      },
      deleteQuote(e) {
        e.stopPropagation();
        const shouldDelete = confirm('Do you want to delete the quote?')
        if (shouldDelete) this.$emit('remove')
      },
      dateUtil(ts) {
        return new Date(ts).toTimeString().substring(0, 8)
      }
    },
    computed: {
      activeQuery () {
        return this.$store.state.activeQuery
      }
    }
  }
</script>

<style lang="scss" scoped>
.deleteIcon {
  font-size:24px;
  color:red
}
.deleteButton {
  top: - 10
}
</style>
