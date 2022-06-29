<template>
  <div class="container">
    <h3>Übersicht</h3>   
    <p>
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#contactRequests" aria-expanded="false" aria-controls="contactRequests">
      Kontaktanfragen anzeigen
    </button>
  </p>
  <div class="collapse" id="contactRequests">
    <div class="card card-body">
      <contactRequestCard :requests="contactRequests" />
    </div>
  </div> 
  </div>
</template>

<script>
import contactRequestCard from "../../components/contactRequestCard.vue";
export default {
  name: "Vorgänge",
  data() {
    return {
      contactRequests: []
    };
  },
  mounted: function () {
    if(!this.$cookies.isKey('fm_token')){
      this.workerLogin();
    }else{
      this.getContactRequests();
    }
  },
  components:{
    contactRequestCard
  },
  methods:{
    async getContactRequests(){
      let data = await this.fetch_get({} , "/api/contactRequest/all" );
      if(data){
        this.contactRequests = data.result;
      }else{
        this.$notify({group: "error",title: "Fehler!",text: "Keine Anfragen gefunden",},2000);
      }
    }
  }
};
</script>
