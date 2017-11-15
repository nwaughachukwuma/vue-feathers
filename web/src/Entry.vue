<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="well">

          <toy-form/>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ToyForm from './components/ToyForm'

  export default {
    components: { ToyForm }
  }
</script>

<style lang="scss" scoped>
.container {
  margin-top: 2em;
}
</style>
