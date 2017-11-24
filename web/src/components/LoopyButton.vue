<template>
  <button class="btn btn-primary" @click.prevent="onClick">
    {{ n }}
  </button>
</template>

<script>

  export default {
    data () {
      return {
        n: 1
      }
    },
    methods: {
      onClick: () => {
        this.n += 1
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
