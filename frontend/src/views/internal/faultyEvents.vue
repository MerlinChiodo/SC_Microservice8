<template>
  <div class="container">
    <h3>Fehlerhafte Events</h3>	
    <table class="table">
        <thead>
            <tr>
            <th scope="col">ID</th>
            <th scope="col">eventID</th>
            <th scope="col">content</th>
            <th scope="col">time</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in events" :key="item.id">
                <th scope="row">{{item.id}}</th>
                <td>{{item.eventId}}</td>
                <td>{{item.content}}</td>
                <td>{{item.failTime}}</td>
            </tr>
        </tbody>
        </table>
    <br />
  </div>
</template>

<script>
export default {
  name: "Fehlerhafte Events",
  data() {
    return {
      events: []
    };
  },
  mounted: function(){
      this.loadEvents();
  },
  methods: {
      loadEvents(){
        const options = {
            method: 'GET',
            headers: {'token':"1234"}
        };
        fetch('http://localhost:3000/api/faultyEvents', options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            this.events = data.events
        })
        .catch(error => {console.log(error)});
      }
  },
};
</script>
