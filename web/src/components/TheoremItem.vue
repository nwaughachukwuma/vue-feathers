<template>
  <li class="list-group-item">
    <p>{{ theorem.text }}</p>
    <small class="text-muted">Author: {{ theorem.author }}</small>
  </li>
</template>

<script>
  export default {
    props: {
      theorem: { type: Object, required: true }
    }
  }
</script>

<style lang="scss" scoped>
</style>
