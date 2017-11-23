<template>
  <li class="list-group-item">
    <p>{{ quote.text }}</p>
    <small class="text-muted">
      <i class="fa fa-user"></i>
      Author: {{ quote.author }}
    </small>
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
