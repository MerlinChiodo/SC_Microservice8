<template>
  <div class="row pb-4">
    <!-- Form -->
    <form>
        <div class="mb-3" v-if="for_process==undefined">
            <label for="process" class="form-label">Token</label><br>
            <input type="text" id="process" v-model="token"/>
        </div>
        <div class="mb-3" v-if="for_process==undefined">
            <label for="process" class="form-label">Prozess-Nr.</label><br>
            <input type="number" id="process" v-model.number="process"/>
        </div>
        <div class="mb-3">
            <label for="formFileLg" class="form-label">Datei</label><br>
            <input class="form-control form-control-lg" id="formFileLg" type="file" accept=".jpg,.png,.jpeg,.pdf" @change="uploadFile" ref="file"/>
        </div>
        <button type="button" class="btn btn-primary" @click="submitFile" data-bs-toggle="modal" data-bs-target="#exampleModal">Hochladen</button>
    </form>

    <!-- Modal -->
    <div class="modal fade bd-example-modal-sm" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
        <div class="modal-body d-flex justify-content-center">
            <h4 v-if="file==null">Bitte Datei auswählen</h4>
            <h4 v-else-if="error!=null">{{error}}</h4>
            <div v-else>
                <div v-if="response==null" class="spinner-border" role="status">
                    <span class="sr-only"></span>
                </div>
                <a v-else :href="`/api/files/${response.filename}?token=1234`">Datei ansehen</a>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-if="file==null||response!=null||error!=null">Ok</button>
        </div>
        </div>
    </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "Upload-Fläche",
  data() {
    return {
      process: 0,
      token: null,
      file: null,
      response: null,
      error: null
    }
  },
  props: {
    for_process: {
      type: Number,
      required: false,
    }
  },
  methods: {
      uploadFile() {
        this.file = this.$refs.file.files[0];
      },
      async submitFile() {
        if(this.file==null){
            return
        }
        if(this.for_process!=undefined){
            this.process = this.for_process;
        }
        if(this.file.size > 5000000){
            this.error = "Datei zu groß (max. 5MB)";
            return
        }
        this.error = "Warte auf Antwort...";
        const formData = new FormData();
        formData.append('file', this.file);
        formData.append('processID', this.process);
        let data = await this.fetch_post_formdata({} ,formData, "/api/files" );
        if(data){
          this.response = data;
          this.error = null;
        }else{
          this.error = "Da ist etwas schiefgelaufen";
        }
      }
    }
};
</script>
<style scoped>
button {
  background-color: rgb(2, 0, 36);
  border-color: rgb(2, 0, 36);
}
button:hover {
  background-color: rgb(2, 0, 36);
  border-color: rgb(2, 0, 36);
}
</style>