<template>
    <div>
        <!-- Button trigger modal -->
        <button 
          type="button" 
          class="btn btn-primary btn-lg btn-block addQuote"
          data-toggle="modal" 
          data-target="#editableQuoteModal"
        >
          <i class="fa fa-quote-left"></i>
          Add Quote
        </button>
        <!-- Modal -->
        <div class="modal fade" id="editableQuoteModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="modalLabel">
                            New Quote
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </h3>
                    </div>
                    <div class="modal-body">
                        <editable-quote :mode="'edit'" @created="hideModal" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" data-dismiss="modal">Dismiss</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  import EditableQuote from './EditableQuote'

  export default {
    components: { EditableQuote },
    props: {
      quote: { type: Object }
    },
    methods: {
        hideModal() {
          $('#editableQuoteModal').modal('hide');
          this.$emit('created')
        }
    },
  }
</script>

<style lang="scss" scoped>
.addQuote {
  margin-bottom: 1em;
}
</style>
