<template>
  <div @click="toggleMode">
    <p>
      <i class="fa fa-quote-left"></i>
      <label v-html="$options.filters.highlight(authorQuote.text, activeQuery)">
        {{ authorQuote.text }}
      </label>
    </p>
    <div class="row">
      <small class="text-primary col-md-5" v-if="authorQuote.edited"> 
        <i class="fa fa-clock-o"></i>
        {{ authorQuote.updatedAt && dateUtil(authorQuote.updatedAt) }}
      </small>
      <span class="col-md-7 pull-right actionButtons">
        <button class="btn pull-right" @click="deleteQuote">
          <i class="fa fa-trash deleteIcon"></i>
        </button>

        <like-quote :authorQuote="authorQuote" />
        <quote-comments :authorQuote="authorQuote" />
      </span>
    </div>
  </div>
</template>

<script>
  import LikeQuote from './LikeQuote'
  import QuoteComments from './QuoteComments'

  export default {
    components: {LikeQuote, QuoteComments},
    props: {
      authorQuote: { type: Object, required: true },
    },
    methods: {
      toggleMode() {
        this.$emit('toggleMode', {mode: 'edit', itemId: this.authorQuote._id})
      },
      deleteQuote(e) {
        e.stopPropagation();
        const shouldDelete = confirm('Do you want to delete the quote?')
        if (shouldDelete) this.$emit('remove')
      },
      toggleComment(e) {
        e.stopPropagation();
        console.log('open an edit quote field')
      },
      dateUtil(ts) {
        const date = new Date(ts);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const _date = ` (${month}-${day}-${year})`;
        return new Date(ts).toTimeString().substring(0,5) + _date
      }
    },
    computed: {
      activeQuery () {
        return this.$store.state.activeQuery
      }
    }
  }
</script>

<style lang="scss" scoped>
.deleteIcon {
  font-size:20px;
  color:red
}
.deleteButton {
  top: - 10
}
.actionButtons {
  margin: -10px; 
  justify-content: center;
  align-items: baseline;
}
</style>
