<template>
  <div class="wrapper">
    <h5 v-if="!sign">Steuerjahr {{year}}</h5>
    <h5 v-else>Laufende Prozesse: Sachbearbeiter {{sign}}</h5>
    <div v-for="process in processes" :key="process.id" class="card mt-10 mb-10">
      <div class="row">
        <div class="col-sm">
          {{ process.processTypes.name }}
        </div>
        <div class="col-sm">
          <ProcessStatusCard :statusUpdates="process.statusUpdates" />
          <div v-if="sign">
            <br>
            {{ process.citizens }}
          </div>
        </div>
        <div class="col-sm">
          <a v-if="!sign" :href="'/konto/vorgang?id='+process.id" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Detailansicht</a>
          <a v-else :href="'/intern/vorgang?id='+process.id" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Detailansicht</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProcessStatusCard from "./processStatusCard.vue";
export default {
  name: "Processes",
  props: {
    processes: {
      type: Array,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    sign: {
      type: Text,
      required: false,
    }
  },
  components: {
    ProcessStatusCard
  }
};
</script>