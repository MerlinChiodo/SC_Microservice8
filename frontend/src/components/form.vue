<template>
  <div>
    <h4 v-if="!forms || forms.length==0">Keine Formulare gefunden</h4>
    <div v-else class="row pb-4" v-for="item in forms" :key="item.id">
      <div  class="col-4" >
        <h2>{{ item.title }}</h2>
        {{ item.target }}<br />
        <a v-bind:href="item.path" target="_blank" class="btn btn-primary">Download</a>
        <button v-if="admin" class="btn btn-danger" type="button" @click="deleteForm(item.id)">Löschen</button>
      </div>
      <div class="col-8">
        {{ item.descr }}<br />
        {{ isoDateToString(item.adddate) }}<br />
      </div>
    </div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deadlineModal" v-if="admin">Neues Formular</button>

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
              <label for="target">Zielgruppe</label>
              <textarea class="form-control" id="target" v-model="target"></textarea>
            </div>
            <div class="form-group">
              <label for="path">Dateipfad</label>
              <textarea class="form-control" id="path" v-model="path"></textarea>
            </div>
          </form>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addForm()">Hinzufügen</button>
        </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "form",
  data() {
    return {
      path: null,
      title: null,
      target: null,
      descr: null
    };
  },
  props: {
    forms: {
      type: Array,
      required: true,
    },
    admin:{
        type: Boolean,
        required: false
    }
  },
  methods: {
    async deleteForm(did){
        let data = await this.fetch_delete({} , '/api/forms/'+did );
        if(data){
          this.$router.go();
        }else{
          this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",},2000);
        }
      },
    async addForm(){
      let body = {
                path: this.path,
                description: this.descr,
                title: this.title,
                target: this.target
            };
      let data = await this.fetch_post({} , body, '/api/forms/');
      if(data){
        this.$router.go();
      }else{
        this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",},2000);
      }
    }
  }
};
</script>