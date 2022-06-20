<template>
  <div class="container" v-if="process">
    <div class="processDetails" v-if="processDetails">
      <h3>{{ processDetails.processTypes.name }}</h3>
      <p>Sachbearbeiter: {{ processDetails.worker.sign }}</p>
      <ProcessStatusCard :statusUpdates="processDetails.statusUpdates" />
      <br>
    </div>
    <div class="row">
      <div class="col">
        <FilesCards :process="process" />
        <UploadCards :for_process="process" />
      </div>
      <div class="col">
        <NoteCards :process="process" />
      </div>
    </div>
  </div>
</template>

<script>
import FilesCards from "../../components/filesCard.vue";
import NoteCards from "../../components/noteCard.vue";
import UploadCards from "../../components/uploadCard.vue";
import ProcessStatusCard from "../../components/processStatusCard.vue";
export default {
  name: "Vorgänge",
  data() {
    return {
      process: null,
      processDetails: null,
      status: null
    };
  },
  components: {
    NoteCards,
    FilesCards,
    UploadCards,
    ProcessStatusCard
  },
  mounted: function () {
    this.process = this.$route.query.id;
    console.log(this.process === "" || this.process === undefined);
    if (this.process === "" || this.process === undefined) {
      this.$router.push("NotFound");
    }
    this.getProcess();
  },
  methods: {
    async getProcess() {
      const options = {
        method: "GET",
        headers: { token: "1234" },
      };
      await fetch("/api/process/" + this.process, options)
        .then((response) => response.json())
        .then((data) => {
          if (data.process) {
            this.processDetails = data.process;
            if(!data.process.statusUpdates || data.process.statusUpdates.length == 0){
              this.status = 0;
            }else{
              this.status = data.process.statusUpdates[data.process.statusUpdates.length-1].status
            }
          } else {
            this.$router.push("NotFound");
          }
        });
    },
  },
};
</script>
