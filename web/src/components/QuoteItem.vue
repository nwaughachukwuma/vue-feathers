<template>
  <li class="list-group-item">
    <p>
      <i class="fa fa-quote-left"></i>
      {{ quote.text }}
    </p>
  </li>
</template>

<script>
  export default {
    props: {
      quote: { type: Object, required: true }
    }
  }
</script>

<style lang="scss" scoped>
</style>
