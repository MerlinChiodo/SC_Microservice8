<template>
  <div class="container" v-if="process">
    <div class="processDetails" v-if="processDetails">
      <h3>{{ processDetails.processTypes.name }}</h3>
      <p>Sachbearbeiter: {{ processDetails.worker.sign }}</p>
      <ProcessStatusCard :statusUpdates="processDetails.statusUpdates" />
      <br>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#statusModal">Neuer Status</button>
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


    <!-- Modal -->
    <div class="modal fade bd-example-modal-sm" id="statusModal" tabindex="-1" aria-labelledby="statusModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
        <div class="modal-body d-flex justify-content-center">
            <div v-if="state=='idle'">
                <h4>Neuer Status:</h4>
                <button type="button" class="btn btn-primary" @click="addStatusUpdate(1)">In Bearbeitung</button><br><br>
                <button type="button" class="btn btn-danger" @click="addStatusUpdate(2)">Rückfrage</button><br><br>
                <button type="button" class="btn btn-success" @click="addStatusUpdate(3)">Abgeschlossen</button><br><br>
            </div>
            <h4 v-else-if="state=='fail'">Da ist etwas schiefgelaufen</h4>
            <h4 v-else-if="state=='done'">Der Status wurde aktualisiert</h4>
            <div v-else>
                <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="state='idle';this.$router.go()">Ok</button>
        </div>
        </div>
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
      state: 'idle',
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
      let data = await this.fetch_get({} , "/api/process/" + this.process );
      if(data.process){
        this.processDetails = data.process;
        this.status = data.process.statusUpdates[data.process.statusUpdates.length-1].status;
      }else{
        this.$router.push("NotFound");
      }
    },
    async addStatusUpdate(newStatus){
      let body = {
            process: this.process,
            status: newStatus
          };
      let data = await this.fetch_post({} ,body, "/api/statusUpdates/" );
      if(data){
        this.state='done';
      }else{
        this.state='fail';
      }
    }
  },
};
</script>
