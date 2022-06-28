<template>
  <div class="container">
    <h4 v-if="!entries || entries.length==0">Keine Blog-Einträge gefunden</h4>
    <div v-else class="row pb-4" v-for="item in entries" :key="item.id">
      <div class="col-4">
        <h2>{{ item.title }}</h2>
        {{ item.target }}<br />
        <img
          v-bind:src="item.imagePath"
          class="rounded img-fluid"
          alt="Blog-Eintrag Bild"
        />
      </div>
      <div class="col-8 pt-5">
        {{ item.description }}<br />
        {{ isoDateToString(item.adddate) }}<br />
        <button v-if="admin" class="btn btn-danger" type="button" @click="deleteEntry(item.id)">Löschen</button>
      </div>
    </div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#blogEntryModal" v-if="admin">Neuer Blog-Eintrag</button>

    <!-- Modal -->
    <div class="modal fade bd-example-modal-sm" id="blogEntryModal" tabindex="-1" aria-labelledby="blogEntryModalLabel" aria-hidden="true">
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
                <label for="target">Zielgruppe</label>
                <textarea class="form-control" id="target" v-model="target"></textarea>
              </div>
              <div class="form-group">
                <label for="path">Dateipfad</label>
                <textarea class="form-control" id="path" v-model="path"></textarea>
              </div>
            </form>
          <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addEntry()">Hinzufügen</button>
          </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Blog-Eintrag",
  data() {
    return {
      path: null,
      title: null,
      target: null,
      descr: null
    };
  },
  props: {
    entries: {
      type: Array,
      required: true,
    },
    admin:{
        type: Boolean,
        required: false
    }
  },
  methods: {
    async deleteEntry(did){
        let data = await this.fetch_delete({} , '/api/blogEntries/'+did );
        if(data){
          this.$router.go();
        }else{
          this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",},2000);
        }
      },
    async addEntry(){
      let body = {
                path: this.path,
                description: this.descr,
                title: this.title,
                target: this.target
            };
      let data = await this.fetch_post({} , body, '/api/blogEntries/');
      if(data){
        this.$router.go();
      }else{
        this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",},2000);
      }
    }
  }
};
</script>