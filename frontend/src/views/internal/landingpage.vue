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
      surl: "vps2290194.fastwebserver.de:9780",
      about_us: "Finanzen oder so", 
      picture: "http://vps2290194.fastwebserver.de:9780/api/files/f394172b-747c-412a-bfc9-872701fc2d98.png?token=1234"
    };
  },
  methods: {
    updateService() {
      const body = {
        "surl": this.surl,
        "aboutus": this.about_us,
        "pictureurl": this.picture
      };
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json", token: "1234" },
        body: JSON.stringify(body)
      };
      fetch("/api/landingpage/", options)
        .then((response) => {
          if (response.status == 200) {
            this.$notify({group: "success",title: "Erfolg!",text: "Event erfolgreich gesendet",},2000);
          } else {
            throw new Error("Something went wrong");
          }
        })
        .catch((error) => {
          this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",error: error,},2000);
        });
    },
    deleteService() {
      const options = {
        method: "DELETE",
        headers: { token: "1234" },
      };
      this.state = "waiting";
      fetch("/api/landingpage/", options)
        .then((response) => {
          if (response.status == 200) {
            this.$notify({group: "success",title: "Erfolg!",text: "Event erfolgreich gesendet",},2000);
          } else {
            throw new Error("Something went wrong");
          }
        })
        .catch((error) => {
          this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",error: error,},2000);
        });
    },
  },
};
</script>
