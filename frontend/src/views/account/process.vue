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
    <button type="button" class="btn btn-dark" @click="exportPDF">Export PDF</button>
  </div>
</template>

<script>
import jsPDF from 'jspdf'
import QRCode from 'qrcode'
import * as htmlToImage from 'html-to-image';
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
      let data = await this.fetch_get({} ,"/api/process/" + this.process);
      if(data){
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
      }
    },
    async exportPDF() {
      let processLink = 'http://vps2290194.fastwebserver.de:9780/konto/vorgang?id='+this.processDetails.id;
      let qr_data = await QRCode.toDataURL(processLink);
      let filename = 'Vorgang-'+this.processDetails.id+'.pdf';
      var doc = new jsPDF('portrait', 'pt', 'a3');
      doc.setFillColor(0,0,0);
      doc.rect(0, 0, doc.internal.pageSize.width, 70, 'F');
      doc.rect(0, doc.internal.pageSize.height-70, doc.internal.pageSize.width, 70, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text('Finanzamt Münster', 40, 40);
      doc.setFontSize(12);
      doc.text('Bürger: '+this.processDetails.citizens.name+" "+this.processDetails.citizens.lastname, 500, 40);
      doc.text('E-Mail: '+this.processDetails.citizens.email, 500, 60);
      doc.setTextColor(0, 0, 0);
      doc.text("Typ: "+this.processDetails.processTypes.name, 40, 100);
      doc.text("Vorgang-Nr: "+ this.processDetails.id, 200, 100);
      doc.text("Datum: "+this.processDetails.date, 40, 120);
      doc.text("Sachbearbeiter: "+this.processDetails.worker.sign, 40, 140);
      doc.text("Status: "+ (this.status==3?"Abgeschlossen":"Offen"), 40, 160);
      doc.text("Notizen: ", 40, 180);
      var node = document.getElementById('pNotes');
      htmlToImage.toPng(node)
      .then(function (dataUrl) {
        const img = new Image();
        img.src = dataUrl;
        doc.addImage(dataUrl, 'png', 40, 190, img.naturalWidth, img.naturalHeight);
        doc.setFontSize(5);
        doc.text(600, 215, processLink);
        doc.addImage(qr_data, 'png', 600, 80, 130, 130);
        doc.save(filename);
      })
      .catch(function (error) {
          this.$notify({group: "error",title: "Fehler!",text: "Die PDF-Erstellung ist fehlgeschlagen",error: error,},2000);
      });
      
    }
  },
};
</script>
