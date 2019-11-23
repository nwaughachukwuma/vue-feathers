<template>
  <div @click="toggleMode">
    <button class="btn pull-right" @click="deleteQuote">
      <i class="fa fa-trash deleteIcon"></i>
    </button>
    <button class="btn pull-right" @click="likeQuote" :disabled="disableButton">
      <i class="fa fa-heart heartIcon" :class="{'heartIcon-on': likeStatus}"></i>
      <small for="">{{likeCount}}</small>
    </button>
    <p>
      <i class="fa fa-quote-left"></i>
      <label v-html="$options.filters.highlight(authorQuote.text, activeQuery)">
        {{ authorQuote.text }}
      </label>
    </p>
    <small class="text-primary" v-if="authorQuote.edited"> 
      <i class="fa fa-clock-o"></i> updated
      {{ authorQuote.updatedAt && dateUtil(authorQuote.updatedAt) }}
    </small>
  </div>
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
        disableButton: false
      }
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
.deleteIcon {
  font-size:20px;
  color:red
}
.deleteButton {
  top: - 10
}
.heartIcon {
  font-size:20px;
  color:rgb(128, 123, 123)
}
.heartIcon-on {
  color:red
}
.like-container {
  margin-inline-end: 5px;
}
</style>
