<template>
  <div class="container">
    <h3>Vorgänge</h3>
    <h5 v-if="processes.length==0">Es wurden keine Vorgänge gefunden</h5>
    <ProcessCards :processes="processes" :year="year-4" v-if="processes"/>
    <ProcessCards :processes="processes" :year="year-3" v-if="processes"/>
    <ProcessCards :processes="processes" :year="year-2" v-if="processes"/>
    <ProcessCards :processes="processes" :year="year-1" v-if="processes"/>
    <ProcessCards :processes="processes" :year="year" v-if="processes"/>
    <br />
    <button type="button" @click="$router.push('/Konto/Neuer_Vorgang')" class="btn btn-primary">
      Neuer Vorgang
    </button>
  </div>
</template>

<script>
import ProcessCards from "../../components/processCard.vue";
export default {
  name: "Vorgänge",
  data() {
    return {
      processes: null,
      year: new Date().getFullYear(),
    };
  },
  components: {
    ProcessCards,
  },
  mounted: function () {
    this.getProcesses();
  },
  methods: {
    async getProcesses() {
      let data = await this.fetch_get({} ,"/api/process/All");
      if(data){
        this.processes = data.result;
      }else{
        this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen"},2000);
      }
    },
  },
};
</script>
