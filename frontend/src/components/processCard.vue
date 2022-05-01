<template>
  <div class="wrapper">
    <h5 v-if="!sign">Steuerjahr {{jahr}}</h5>
    <h5 v-else>Laufende Prozesse: Sacharbeiter {{sign}}</h5>
    <div v-for="process in processes" :key="process.id" class="card mt-10 mb-10">
      <div class="row">
        <div class="col-sm">
          {{ process.type }}
        </div>
        <div class="col-sm">
          <div class="row" style="height:50px">
                <div class="col-sm"  v-if="!sign" style="background-color:rgba(2, 0, 36, 1);color:white">
                    Eingereicht
                </div>
                <div v-if="process.status==1||process.status==3" class="col-sm" style="background-color:rgba(2, 0, 36, 1);color:white">
                    In Bearbeitung
                </div>
                <div v-else-if="process.status==2" class="col-sm" style="background-color:rgba(245, 0, 10, 1);color:white">
                    Rückfrage
                </div>
                <div v-else class="col-sm">
                    In Bearbeitung
                </div>
                <div v-if="process.status==3" class="col-sm" style="background-color:rgba(2, 0, 36, 1);color:white">
                    Abgeschlossen
                </div>
                <div v-else class="col-sm">
                    Abgeschlossen
                </div>
            </div>
        </div>
        <div class="col-sm" v-if="sign">
          {{ process.name }}
        </div>
        <div class="col-sm">
          <button class="btn btn-primary" type="button">Detailansicht</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Processes",
  props: {
    processes: {
      type: Array,
      required: true,
    },
    jahr: {
      type: Number,
      required: true,
    },
    sign: {
      type: Text,
      required: false,
    }
  },
};
</script>