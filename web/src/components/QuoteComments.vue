<template>
    <div>
        <button 
            type="button"
            class="btn pull-right"
            @click.stop.prevent="showModal"
        >
        <i class="fa fa-comment commentIcon"></i>
        <small for="">{{commentCount}}</small>
        </button>
        <!-- Comments Modal -->
        <div @click.stop.prevent="() => true" class="modal fade" :id="'qCM'+authorQuote._id" tabindex="-1" role="dialog" aria-labelledby="modalLabel1" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="modalLabel1">
                            Comments
                            <button type="button" class="close" aria-label="Close" @click.stop="hideModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </h3>
                    </div>
                    <div class="modal-body">
                        <!-- show all the comments here -->
                        <span v-if="fetching">
                            <i class="fa fa-spinner fa-spin"></i>
                        </span>
                        <ul v-else class="list-group" v-for="(comment, index) in comments" :key="index">
                            <comment-item :comment="comment" />
                        </ul>
                        <comment-quote 
                            :authorQuote="authorQuote" 
                            @created="hideModal"
                            @commentCreated="refreshComments"
                        />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" @click.stop="hideModal">Dismiss</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import CommentQuote from './CommentForm'
import CommentItem from './CommentItem'
import { isEmpty } from 'lodash'

import clientAuth from '../auth'

export default {
    name: 'quote-comments',
    components: {CommentQuote, CommentItem},
    props: {
        authorQuote: { type: Object, required: true },
    },
    data() {
      return {
        commentCount: 0,
        comments: [],
        fetching: false
      }
    },
    methods: {
        isEmpty,
        async showModal(e) {
            $('#qCM'+this.authorQuote._id).modal('toggle');
            await this.$store.dispatch('store_commentClicked', {quoteId: this.authorQuote._id})
            this.fetching = true;
            this.fetchComments(this.authorQuote._id)
        },
        hideModal(e) {
            $('#qCM'+this.authorQuote._id).modal('hide');
            //   this.$emit('created')
        },
        async fetchComments(quoteId) {
            // const quoteId =  this.$store.state.activeQuoteId;
            if (quoteId !== this.authorQuote._id) return;
            const result = await this.$feathers.service('comments').find({
                query: {
                    quoteId,
                },
                headers: clientAuth()
            });
            this.fetching = false;
            this.comments = result.data || [];
        },
        refreshComments({quoteId, commentId}) {
            this.fetchComments(quoteId)
        }
    },
    mounted() {
        const quoteId = this.authorQuote._id;
        this.$feathers.service('comments').find({
            query: {
                quoteId,
            },
            headers: clientAuth(),
        })
        .then(res => this.comments = res.data)
    },
    watch: {
        comments: {
            handler(val) {
                this.commentCount = Math.max(val.length, 0)
            },
            immediate: true
        }
    },
}
</script>

<style lang="scss" scoped>
.commentIcon {
  font-size:18px;
  color:rgb(85, 193, 226)
}
</style>