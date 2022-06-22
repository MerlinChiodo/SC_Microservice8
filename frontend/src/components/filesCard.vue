<template>
  <div class="container">
    <h3>Dateien</h3>
    <div class="notizen">
      <p v-for="item in allFiles" :key="item.id">
        <a :href="`/api/files/${item.path}?token=1234`">
            [{{ item.path.split(".")[1] }}] Datei ansehen
        </a><br />
        Upload-Datum: {{ isoDateToString(item.date) }}
      </p>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  name: "Dateien",
  data() {
    return {
      allFiles: [],
    };
  },
  props: {
    process: {
      type: Number,
      required: true,
    },
  },
  mounted: function () {
    this.loadFiles();
  },
  methods: {
    async loadFiles() {
      let data = await this.fetch_get({ process: this.process } ,"/api/files/all");
      if(data){
        this.allFiles = data.result;
      }else{
        this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen"},2000);
      }
    }
  }
};
</script>