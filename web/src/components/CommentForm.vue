<template>
    <div @click.stop.prevent="() => true">
        <div class="panel panel-default">
          <div class="panel-heading">
            New Comment
          </div>
          <div class="panel-body">
              <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <input 
                            type="text" 
                            class="form-control" 
                            id="inputComment" 
                            placeholder="Write..." 
                            v-model="comment"
                            required
                        >
                    </div>
                    <button type="button" @click.stop.prevent="onSubmit" class="btn btn-primary">
                        Post
                    </button>
                    <small class="text-muted" v-if="typing">
                        <small>typing...</small>
                    </small>
                </form>
          </div>
        </div>
    </div>
</template>

<script>

  import { debounce, throttle, isEmpty } from 'lodash'

  export default {
    props: {
      authorQuote: { type: Object, required: true },
    }, 
    data () {
      return {
        name: '',
        comment: '',
        typing: undefined
      }
    },
    methods: {
      onSubmit () {
        // get user name and id from auth object
        if (isEmpty(this.comment)) return;
        const quoteId = this.activeQuoteId;
        this.$feathers.service('comments').create({
          quoteId,
          author: 'Nnamdi Bruce',
          text: this.comment
        })
          .then( res => {
            this.name = ''
            this.comment = ''
            this.$emit('commentCreated', {quoteId, commentId: res._id})
          })
          .catch(err => console.log(err))
      },
    },
    computed: {
        activeQuoteId () {
            return this.$store.state.activeQuoteId
        }
    },
    watch: {
      authorQuote: {
        handler(val) {
            this.quote = val.text;
        },
        immediate: true
      },
      comment: {
        handler(val) {
            if (val.length > 1) this.typing = true
            else this.typing = false
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
