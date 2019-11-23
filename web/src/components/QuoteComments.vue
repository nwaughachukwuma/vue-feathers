<template>
    <div>
        <button 
            type="button"
            class="btn pull-right"
            @click.stop.prevent="showModal"
        >
        <!-- @click.stop.prevent="showModal" -->
        <i class="fa fa-comment commentIcon"></i>
        <small for="">{{commentCount}}</small>
        </button>
        <!-- Modal -->
        <div @click.stop.prevent="true" class="modal fade" id="quoteCommentsModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel1" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="modalLabel1">
                            New comment
                            <button type="button" class="close" aria-label="Close" @click.stop="hideModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </h3>
                    </div>
                    <div class="modal-body">
                        <comment-quote :mode="'edit'" :parent="'modal'" @created="hideModal" />
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

import CommentQuote from './EditableQuote'

export default {
    name: 'quote-comments',
    components: {CommentQuote},
    props: {
        authorQuote: { type: Object, required: true },
    },
    data() {
      return {
        commentCount: 0,
        isModal: false
      }
    },
    methods: {
        showModal(e) {
            $('#quoteCommentsModal').modal('toggle');
        },
        hideModal(e) {
            $('#quoteCommentsModal').modal('hide');
            //   this.$emit('created')
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