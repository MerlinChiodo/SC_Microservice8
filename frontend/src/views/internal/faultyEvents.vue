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
      async loadEvents(){
        let data = await this.fetch_get({} , "/api/faultyEvents/" );
        if(data){
          this.events = data.events
        }else{
          console.log(data);
          this.$notify({group: "error",title: "Fehler!",text: "Keine Events gefunden",},2000);
        }
      },
      async deleteEvent(id){
        let data = await this.fetch_delete({}, "/api/faultyEvents/" + id );
        if(data){
          this.loadEvents();
        }else{
          this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",},2000);
        } 
      }
  },
};
</script>
