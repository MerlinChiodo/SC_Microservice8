<template>
  <div class="container">
    <h2>Fristen</h2>
    <br />
    <DeadlineCard :deadlines="deadlines" :admin="true" v-if="deadlines"/>
    <br />
  </div>
</template>

<script>
import DeadlineCard from "../components/deadlineCard.vue";
export default {
  name: "Termine - Fristen",
  data() {
    return {
      deadlines: []
    };
  },
  components: {
    DeadlineCard,
  },
  mounted: function(){
      this.loadDeadlines()
  },
  methods: {
      async loadDeadlines(){
        let data = await this.fetch_get({} , '/api/deadline/all' );
        if(data){
          this.deadlines = data.result
        }else{
          this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",},2000);
        }
      }
  },
};
</script>
