<template>
  <div class="container">
    <h3>Übersicht</h3>   
    <div class="d-grid gap-2">
      <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#contactRequests" aria-expanded="false" aria-controls="contactRequests">
        Kontaktanfragen anzeigen
      </button>
      <div class="collapse" id="contactRequests">
        <div class="card card-body">
          <contactRequestCard :requests="contactRequests" />
        </div>
      </div> 
      <br>
      <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#processRequests" aria-expanded="false" aria-controls="processRequests">
        Vorgänge anzeigen
      </button>
      <div class="collapse" id="processRequests">
        <div class="card card-body">
          <citizenCard :citizens="citizens" />
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import contactRequestCard from "../../components/contactRequestCard.vue";
import citizenCard from "../../components/citizenCard.vue";
export default {
  name: "Vorgänge",
  data() {
    return {
      contactRequests: [],
      citizens: []
    };
  },
  mounted: function () {
    if(!this.$cookies.isKey('fm_token')){
      this.workerLogin();
    }else{
      this.getContactRequests();
      this.getCitizens();
    }
  },
  components:{
    contactRequestCard,
    citizenCard
  },
  methods:{
    async getContactRequests(){
      let data = await this.fetch_get({} , "/api/contactRequest/all" );
      if(data){
        this.contactRequests = data.result;
      }
    },
    async getCitizens(){
      let data = await this.fetch_get({} , "/api/citizen/all" );
      if(data){
        this.citizens = data.citizens;
      }
    }
  }
};
</script>
