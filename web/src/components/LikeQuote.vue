<template>
    <button class="btn pull-right" @click="likeQuote" :disabled="disableButton">
      <i class="fa fa-heart heartIcon" :class="{'heartIcon-on': hasLikedQuote}"></i>
      <small for="" >{{likeCount}}</small>
    </button>
</template>

<script>
  import {debounce, get} from 'lodash'
  import clientAuth from '../auth'

  export default {
    props: {
      authorQuote: { type: Object, required: true },
    },
    data() {
      return {
        likeCount: 0,
        likes: undefined,
        theLikedQuote: undefined,
        hasLikedQuote: false,
        disableButton: false,
      }
    },
    methods: {
      async likeQuote (e) {
        e.stopPropagation();
        this.disableButton = true;
        if (!!this.theLikedQuote) await this.updateLikedQuote()
        else await this.createLikeQuote();
      },
      createLikeQuote: debounce(async function(e) {
        if (!this.user) {
          this.disableButton = false
          return;
        };

        await this.$feathers.service('likes').create({
          userId: this.user._id,
          quoteId: this.authorQuote._id,
          status: true,
        }, {headers: clientAuth()})
          .then((res) => {
            this.fetchQuoteLikes();
            return this.$emit('liked')
          })
          .catch( (err) => {
            console.error(err)
            alert(err.message)
          }).finally(
            _ => this.disableButton = false
          )
      }, 500),

      updateLikedQuote: debounce(async function(e) {
        if (!this.user) {
          this.disableButton = false
          return;
        };
        const likeStatus = !this.hasLikedQuote
        await this.$feathers.service('likes').update(this.theLikedQuote._id, {
          ...this.theLikedQuote,
          status: likeStatus,
        }, {headers: clientAuth()})
          .then((res) => {
            this.fetchQuoteLikes();
            return this.$emit('liked')
          })
          .catch( (err) => {
            console.error(err)
            alert(err.message)
          }).finally(
            _ => this.disableButton = false
          )
      }, 500),

      fetchQuoteLikes() {
        //get all the likes for this quote
        this.$feathers.service('likes').find({
          query: {
            quoteId: {$search: this.authorQuote._id},
            // userId: {$search: this.user._id}
          },
          headers: clientAuth()
        })
        .then(res => {
          this.likeCount = res.data.filter(el=>!!el.status).length;
          this.likes = res.data;
        })
        .catch(err => {
          console.log('error fetching likes :=>> ', err)
        })
      }
    },
    mounted() {
      this.fetchQuoteLikes();
    },
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
    watch: {
      authorQuote: {
        handler(val) {

        },
        immediate: true
      },
      likes: {
        handler(val) {
          const theLikedQuote = val.find( el => {
            return el.userId === get(this.user, '_id', undefined)
          })
          this.theLikedQuote = theLikedQuote
          this.hasLikedQuote = get(theLikedQuote, 'status', false)
        },
        immediate: false
      }
    },
    sockets: {
      likes_updated(data) {

        if (data.quoteId !== this.authorQuote._id) return
        if (this.user._id !== data.userId) {
            // reload the quotes
            this.fetchQuoteLikes()
        }
        // console.log('likes updated data is :::', data)
      },
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