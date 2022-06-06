<template>
  <div class="wrapper">
    <div class="row" style="height: 50px">
        <div
          class="col-sm"
          style="background-color: rgba(2, 0, 36, 1); color: white"
        >
          Eingereicht
        </div>
        <div
          v-if="status == 1 || status == 3"
          class="col-sm"
          style="background-color: rgba(2, 0, 36, 1); color: white"
        >
          In Bearbeitung
        </div>
        <div
          v-else-if="status == 2"
          class="col-sm"
          style="background-color: rgba(245, 0, 10, 1); color: white"
        >
          Rückfrage
        </div>
        <div v-else class="col-sm">In Bearbeitung</div>
        <div
          v-if="status == 3"
          class="col-sm"
          style="background-color: rgba(2, 0, 36, 1); color: white"
        >
          Abgeschlossen
        </div>
        <div v-else class="col-sm">Abgeschlossen</div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Process Status",
  data() {
    return {
      status: null
    };
  },
  props: {
    statusUpdates: {
      type: Array,
      required: true,
    }
  },
  mounted: function () {
    this.status = this.statusUpdates[this.statusUpdates.length-1].status;
  }
};
</script>