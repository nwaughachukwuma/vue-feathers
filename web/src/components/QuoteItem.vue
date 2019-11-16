<template>
  <div @click="toggleMode">
    <p >
        <i class="fa fa-quote-left"></i>
        {{ authorQuote.text }}
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      authorQuote: { type: Object, required: true }
    },
    methods: {
      toggleMode() {
        this.$emit('toggleMode', {mode: 'edit', itemId: this.authorQuote._id})
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
