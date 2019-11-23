<template>
    <button class="btn pull-right" @click="likeQuote" :disabled="disableButton">
      <i class="fa fa-heart heartIcon" :class="{'heartIcon-on': likeStatus}"></i>
      <small for="" >{{likeCount}}</small>
    </button>
</template>

<script>
  import {debounce} from 'lodash'
  export default {
    props: {
      authorQuote: { type: Object, required: true },
    },
    data() {
      return {
        likeStatus: false,
        likeCount: 0,
        disableButton: false,
      }
    },
    methods: {
      async likeQuote (e) {
        e.stopPropagation();
        this.disableButton = true;
        await this.execLikeQuote();
      },
      execLikeQuote: debounce(async function(e) {
        this.likeStatus = !this.likeStatus
        if (this.likeStatus) {
          this.likeCount++
        } else {
          this.likeCount = Math.max(this.likeCount-1, 0)
        }
        await this.$feathers.service('quotes').update(this.authorQuote._id, {
          ...this.authorQuote,
          updatedAt: Date.now(),
          likeCount: this.likeCount
        })
          .then((res) => this.$emit('liked'))
          .catch( (err) => {
            console.error(err)
            alert(err.message)
          }).finally(
            _ => this.disableButton = false
          )
      }, 500),
    },
    watch: {
      authorQuote: {
        handler(val) {
          this.likeCount = val.likeCount || 0;
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
.heartIcon {
  font-size: 18px;
  color:rgb(128, 123, 123)
}
.heartIcon-on {
  color:red
}
</style>