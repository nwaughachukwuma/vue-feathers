<template>
    <div class="input-group cust-input-group">
        <input 
            class="form-control" 
            type="text" 
            placeholder="Search" 
            aria-label="Search"
            @input="searchItems"
        >
        <div class="input-group-btn">
        <button class="btn btn-default" type="button" disabled>
            <i class="glyphicon glyphicon-search"></i>
        </button>
        </div>
    </div>
</template>

<script>
import {debounce} from 'lodash'
export default {
    methods: {
        searchItems: debounce(function(evt) {
        const query = evt.target.value;
        this.$emit('search', {query})
      }, 1000),
    },
}
</script>

<style lang="scss" scoped>
.cust-input-group {
  margin-bottom: 1em;
}
</style>