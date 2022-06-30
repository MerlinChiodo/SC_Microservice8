<template>
  <div class="wrapper" v-if="filterByYear(year).length>0">
    <h5 v-if="!sign">Steuerjahr {{year}}</h5>
    <div v-else>
      <h5>Sachbearbeiter {{sign}}</h5>
      <div id="customerDetails">
        <h6 style="display: inline">Name: </h6> {{ processes[0].citizens.lastname }}, {{ processes[0].citizens.name }}
        <br>
        <h6 style="display: inline">E-Mail: </h6>{{ processes[0].citizens.email }} <h6 style="display: inline">Geburtstag: </h6> {{ isoDateToString(processes[0].citizens.birthday).split(" ")[0] }}
      </div>
    </div>
    <br>
    <div v-for="process in sign?processes:filterByYear(year)" :key="process.id" class="card mt-10 mb-10">
      <div class="row" v-if="process">
        <div class="col-sm">
          {{ process.processTypes.name }}
        </div>
        <div class="col-sm">
          <ProcessStatusCard :statusUpdates="process.statusUpdates" />
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
  },
  methods: {
    filterByYear(year){
      return this.processes.filter(process => process.date.substring(0,4) == year);
    }
  }
};
</script>