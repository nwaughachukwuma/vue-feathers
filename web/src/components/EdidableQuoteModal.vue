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
                <h5 class="modal-title" id="modalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Am a modal
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>

    </div>
</template>

<script>
  export default {
    props: {
      quote: { type: Object }
    }
  }
</script>

<style lang="scss" scoped>
.addQuote {
  margin-bottom: 1em;
}
</style>
