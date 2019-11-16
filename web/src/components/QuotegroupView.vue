<template>
  <li class="list-group-item">
    <div class="well col-md-offset-3">
      <p class="panel-title authorHeader">
        <i class="fa fa-user"></i>
        <b>Author: {{ author }}</b>
      </p>
      <quote-list :quotes="quotes" />
    </div>
  </li>
</template>

<script>
import QuoteList from './QuoteList' 
export default {
  components: { QuoteList },
  props: {
    quotes: { type: Array, required: true, default: [] },
    author: { type: String, required: true, default: 'John Smith'}
  }
};
</script>

<style lang="scss" scoped>
    .authorHeader {
        color: teal;
        margin-bottom: 10px;
    }
</style>