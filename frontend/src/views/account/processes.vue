<template>
  <div class="container">
    <h3>Vorgänge</h3>
    <ProcessCards :processes="processes" :year="year" v-if="processes"/>
    <br />
    <button type="button" @click="newProcess()" class="btn btn-primary">
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
      year: 2019,
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
      const options = {
        method: "GET",
        headers: { token: "1234" },
      };
      await fetch("/api/process/All", options)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            this.processes = data.result;
          } else {
            this.$router.push("NotFound");
          }
        });
    },
  },
};
</script>
