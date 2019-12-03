<template>
    <p>
        <i class="fa fa-comment"></i>
        <small>
            {{ comment.text }} - {{comment.author}}
        </small>
        <small class="text-muted pull-right" v-if="comment.createdAt"> 
            <i class="fa fa-clock-o"></i>
            {{ comment.createdAt && dateUtil(comment.createdAt) }}
        </small>
    </p>
</template>

<script>
  export default {
    props: {
      comment: { type: Object, required: true },
    },
    methods: {
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
