<template>
  <div class="container">
    <h3>Notizen</h3>
    <div class="notizen" id="pNotes">
      <p
        v-for="item in allNotes"
        :key="item.id"
        :class="{ 'from-agent': item.fromUser, 'from-me': !item.fromUser }"
      >
        <small class="date">{{ isoDateToString(item.date) }}</small
        ><br />
        {{ item.text }}
      </p>
    </div>
    <form class="form-inline">
      <label for="exampleFormControlTextarea1">Neue Notiz:</label>
      <textarea
        v-model="neue_nachricht"
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
      <button @click="sendNote()" type="button" class="btn btn-primary my-1">
        Notiz hinterlassen
      </button>
    </form>
    <br />
  </div>
</template>

<script>
export default {
  name: "Notizen",
  data() {
    return {
      allNotes: [],
      neue_nachricht: "",
    };
  },
  props: {
    process: {
      type: Number,
      required: true,
    },
  },
  mounted: function () {
    this.loadNotes();
  },
  methods: {
    async loadNotes() {
      let data = await this.fetch_get({} , "/api/notes/" + this.process );
      if(data){
        this.allNotes = data.result;
      }
    },
    async sendNote() {
      if (this.neue_nachricht.length > 0) {
        let body = {
            process: this.process,
            text: this.neue_nachricht,
          };
        let data = await this.fetch_post({} ,body, "/api/notes/" );
        if(data){
          this.loadNotes()
        }else{
          this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",},2000);
        }
      }
    },
  },
};
</script>

<style scoped>
.from-me .date {
  color: rgb(243, 243, 243);
}
button {
  background-color: rgb(2, 0, 36);
  border-color: rgb(2, 0, 36);
}
button:hover {
  background-color: rgb(2, 0, 36);
  border-color: rgb(2, 0, 36);
}
.date {
  font-size: 7px;
}
.notizen {
  background-color: #fff;
  border: 1px solid #e5e5ea;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto 1rem;
  padding: 0.5rem 1.5rem;
}
.notizen p {
  border-radius: 1.15rem;
  line-height: 1.25;
  max-width: 75%;
  padding: 0.5rem 0.875rem;
  position: relative;
  word-wrap: break-word;
}
p.from-me {
  align-self: flex-end;
  background-color: rgb(2, 0, 36);
  color: #fff;
}
</style>
