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
                            :id="formId"
                            placeholder="Write..." 
                            v-model="comment"
                            required
                            v-focus="{isActiveQuote: activeQuoteId === authorQuote._id}"
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
  import v4 from 'uuid/v4'
  import clientAuth from '../auth'
  import { localDirectives } from '../mixins/localDirectives'

  export default {
    mixins: [localDirectives],
    props: {
      authorQuote: { type: Object, required: true },
    }, 
    data () {
      return {
        name: '',
        comment: '',
        typing: undefined,
        formId: v4()
      }
    },
    methods: {
      onSubmit () {
        // get user name and id from auth object
        if (isEmpty(this.comment)) return;
        if (isEmpty(this.user)) return
        
        const quoteId = this.activeQuoteId;
        this.$feathers.service('comments').create({
          quoteId,
          author: this.user.name,
          text: this.comment,
          userId: this.user._id
        }, {headers: clientAuth()})
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
      },
      user() {
        return this.$store.getters.user
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
