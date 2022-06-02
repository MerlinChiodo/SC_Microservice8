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
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in events" :key="item.id">
                <th scope="row">{{item.id}}</th>
                <td>{{item.eventId}}</td>
                <td>{{item.content}}</td>
                <td>{{item.failTime}}</td>
                <td>
                    <button type="button" @click="deleteEvent(item.id)" class="btn btn-primary">
                        Löschen
                    </button>
                </td>
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
            this.events = data.events
        })
        .catch(error => {console.log(error)});
      },
      deleteEvent(id){
        const options = {
            method: 'delete',
            headers: {'token':"1234"}
        };
        fetch('http://localhost:3000/api/faultyEvents/'+id, options)
        .then((response) => response.json())
        .then(this.loadEvents)
        .catch(error => {console.log(error)});

      }
  },
};
</script>
