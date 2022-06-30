<template>
  <div class="container">
    <h3>Landingpage-Eintrag</h3>
    <form>
      <div class="form-group">
        <label for="descr">Beschreibung</label>
        <textarea class="form-control" id="descr" v-model="about_us"></textarea>
      </div>
      <div class="form-group">
        <label for="serviceURL">URL</label>
        <input type="url" class="form-control" id="serviceURL"  v-model="surl" />
      </div>
      <div class="form-group">
        <label for="imageURL">Bild-URL</label>
        <input type="url" class="form-control" id="imageURL"  v-model="picture" />
      </div>
    </form>
    <br>
    <button type="button" class="btn btn-primary" @click="updateService()">
      Eintrag Aktualisieren
    </button>
    <br>
    <br>
    <button type="button" class="btn btn-primary" @click="deleteService()">
      Eintrag löschen
    </button>
  </div>
</template>

<script>
export default {
  name: "Vorgänge",
  data() {
    return {
      surl: "http://supersmartcity.de:9780",
      about_us: "Finanzen oder so", 
      picture: "http://supersmartcity.de:9780/api/files/f38de1b5-e8d0-4b86-9099-4a62e826016f.jpg?token=1234"
    };
  },
  methods: {
    async updateService() {
      const body = {
        "surl": this.surl,
        "aboutus": this.about_us,
        "pictureurl": this.picture
      };
      let data = await this.fetch_put({} ,body, "/api/landingpage/" );
      if(data){
        this.$notify({group: "success",title: "Erfolg!",text: "Event erfolgreich gesendet",},2000);
      }else{
        this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",},2000);
      }
    },
    async deleteService() {
      this.state = "waiting";
      let data = await this.fetch_delete({}, "/api/landingpage/" );
      if(data){
        this.$notify({group: "success",title: "Erfolg!",text: "Event erfolgreich gesendet",},2000);
      }else{
        this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",},2000);
      }
    },
  },
};
</script>
