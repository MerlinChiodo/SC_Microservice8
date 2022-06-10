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
      loadDeadlines(){
        const options = {
            method: 'GET',
            headers: {'token':"1234"}
        };
        fetch('/api/deadline/all', options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            this.deadlines = data.result
        })
        .catch(error => {console.log(error)});
      }
  },
};
</script>
