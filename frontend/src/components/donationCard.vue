<template>
  <div class="container">
    <h3 v-if="company">Empfangene Spenden</h3>	
    <h3 v-else>Gesendete Spenden</h3>	
    <table class="table">
        <thead>
            <tr>
            <th scope="col">amount</th>
            <th scope="col">recipiant</th>
            <th scope="col">donator</th>
            <th scope="col">reason</th>
            <th scope="col">purpose</th>
            <th scope="col">date</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in allDonations" :key="item.id">
                <td>{{item.amount}}</td>
                <td>{{item.recipiant}}</td>
                <td>{{item.donator}}</td>
                <td>{{item.reason}}</td>
                <td>{{item.purpose}}</td>
                <td>{{isoDateToString(item.date)}}</td>
            </tr>
        </tbody>
        </table>
    <br />
  </div>
</template>

<script>
export default {
  name: "Spenden",
  data() {
    return {
      allDonations: []
    };
  },
  props: {
    company: {
      type: Boolean,
      required: true,
    },
  },
  mounted: function(){
      this.loadSentDonations();
  },
  methods: {
      async loadSentDonations(){
        let data = await this.fetch_get({} , '/api/donations' );
        if(data){
          this.allDonations = data.donations
        }else{
          this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",},2000);
        }
      }
  },
};
</script>
