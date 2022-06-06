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
                <td>{{item.date}}</td>
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
      if(this.company){
        this.loadReceivedDonations();
      }else{
        this.loadSentDonations();
      }
  },
  methods: {
      loadSentDonations(){
        const options = {
            method: 'GET',
            headers: {'token':"1234"}
        };
        fetch('/api/donations', options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            this.allDonations = data.donations
        })
        .catch(error => {console.log(error)});
      },
      loadReceivedDonations(){
        let companyID = 0 //get from token
        const options = {
            method: 'GET',
            headers: {'token':"1234"}
        };
        fetch('/api/donations/'+companyID, options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            this.allDonations = data.donations
        })
        .catch(error => {console.log(error)});
      }
  },
};
</script>
