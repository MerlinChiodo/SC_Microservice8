<template>
  <div class="container">
    <h5 v-if="!processes || processes.length==0">Es wurden keine aktuellen Vorgänge gefunden</h5>
    <ProcessCards :processes="processes" :year="year" :sign="processes[0].worker.sign" v-if="processes"/>
    <br />
    <button type="button" @click="$router.push('/Konto/Neuer_Vorgang/' + this.$route.params.user)" class="btn btn-primary">
      Neuer Vorgang
    </button>
     <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#relationship" aria-expanded="false" aria-controls="relationship">
        Beziehungsstatus anzeigen
      </button>
      <div class="collapse" id="relationship">
        <div class="card card-body">
          <div v-if="relationship">
            <div v-if="relationship.partner1!=null && relationship.partner2!=null">
              Verheiratet<br>
              Partner 1: 
              <a :href="'/intern/vorgaenge/'+relationship.citizens_citizensTocouples_partner1.id">
                {{relationship.citizens_citizensTocouples_partner1.lastname}}, {{relationship.citizens_citizensTocouples_partner1.name}}
              </a>
              <br>
              Partner 2: 
              <a :href="'/intern/vorgaenge/'+relationship.citizens_citizensTocouples_partner2.id">
                {{relationship.citizens_citizensTocouples_partner2.lastname}}, {{relationship.citizens_citizensTocouples_partner2.name}}
              </a>
              <br>
            </div>
            <p v-else>Getrennt</p>
            Anzahl Kinder: {{relationship.child_amount}}<br>
            
            Zuletzt geändert: {{isoDateToString(relationship.date)}}<br>
          </div>
          <div v-else>Ledig</div>
        </div>
      </div> 
  </div>
</template>

<script>
import ProcessCards from "../../components/processCard.vue";
export default {
  name: "Vorgänge",
  data() {
    return {
      processes: null,
      relationship: null,
      year: new Date().getFullYear()
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
      console.log(this.$route.params.user)
      let data = await this.fetch_get({} ,"/api/process/All?user="+this.$route.params.user);
      if(data && data.result.length != 0){
        this.processes = data.result;
        this.relationship = data.relationship;
      }else {
        this.$router.push("NotFound");
      }
    },
  },
};
</script>
