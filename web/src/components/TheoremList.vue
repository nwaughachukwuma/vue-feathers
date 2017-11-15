<template>
  <ul class="list-group" v-if="theorems.length">
    <theorem-item v-for="theorem in theorems" :theorem="theorem"/>
  </ul>
  <div class="panel-body" v-else>
    <p>No theorems found.</p>
  </div>
</template>

<script>
  import TheoremItem from './TheoremItem'

  export default {
    components: { TheoremItem },
    props: {
      theorems: { type: [Object], default: [] }
    }
  }
</script>

<style lang="scss" scoped>
</style>
