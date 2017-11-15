<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="well">
          <theorem-form @create="fetchTheorems"/>
        </div>

        <div class="panel panel-default">
          <div class="panel-heading">
            Existing Theorems
          </div>
          <theorem-list :theorems="theorems"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TheoremForm from './components/TheoremForm'
  import TheoremList from './components/TheoremList'

  export default {
    data () {
      return {
        theorems: []
      }
    },
    components: { TheoremForm, TheoremList },
    mounted () {
      this.fetchTheorems()
    },
    methods: {
      fetchTheorems () {
        this.$feathers.service('theorems').find()
          .then(result => {
            this.theorems = result.data
          })
          .catch(() => {
            console.log('An error occurred while retreiving theorems.')
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
.container {
  margin-top: 2em;
}
</style>
