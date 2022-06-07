<template>
  <div>
    <div class="pb-4" v-for="item in deadlines" :key="item.id">
      <h4>{{item.title}}<span class="h6"> {{'  '+isoDateToString(item.date)}}</span></h4>
      <p>{{item.descr}}</p>
      <button v-if="admin" class="btn btn-danger" type="button" @click="deleteDeadline(item.id)">Löschen</button>
    </div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deadlineModal" v-if="admin">Neue Frist</button>

    <!-- Modal -->
    <div class="modal fade bd-example-modal-sm" id="deadlineModal" tabindex="-1" aria-labelledby="deadlineModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content p-3">
          <form>
            <div class="form-group">
              <label for="InputTitel">Titel</label>
              <input type="text" class="form-control" id="InputTitel" placeholder="Titel" v-model="title">
            </div>
            <div class="form-group">
              <label for="descr">Beschreibung</label>
              <textarea class="form-control" id="descr" v-model="descr"></textarea>
            </div>
            <div class="form-group">
              <label for="time">Zeit</label><br>
              <input type="datetime-local" id="time" name="Zeit" value="2022-01-01" min="2000-01-01" max="2100-12-31" v-model="date">
            </div>
          </form>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addDeadline()">Ok</button>
        </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Frist",
  data() {
    return {
      date: null,
      title: null,
      descr: null
    };
  },
  props: {
    deadlines: {
      type: Array,
      required: true,
    },
    admin:{
        type: Boolean,
        required: false
    }
  },
  methods:{
      deleteDeadline(did){
        const options = {
            method: 'DELETE',
            headers: {'token':"1234"}
        };
        fetch('/api/deadline/'+did, options)
        .then((response) => response.json())
        .then(this.$router.go())
        .catch(error => {console.log(error)});
      },
      addDeadline(){
        const options = {
            method: 'POST',
            body: JSON.stringify({
                date: this.date+':00.000Z',
                title: this.title,
                description: this.descr
            }),
            headers: { "Content-Type": "application/json", token: "1234" },
        };
        fetch('/api/deadline/', options)
        .then(this.$router.go())
        .catch(error => {console.log(error)});
      }
  }
};
</script>