<template>
  <div class="container">
    <h4 v-if="!requests || requests.length==0">Keine Kontaktanfragen gefunden</h4>
    <div v-else class="row pb-4" v-for="item in requests" :key="item.id">
        <div class="col-4">
            <h4>Von: {{ item.name }} - {{item.email}}</h4>
            <p>
                {{ item.message }} 
                <br />
                {{ isoDateToString(item.date) }}
            </p>
            <button class="btn btn-danger" type="button" @click="deleteEntry(item.id)">Löschen</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Kontaktanfragen",
  props: {
    requests: {
      type: Array,
      required: true,
    }
  },
  methods: {
    async deleteEntry(did){
        let data = await this.fetch_delete({} , '/api/contactRequest/'+did );
        if(data){
          this.$router.go();
        }else{
          this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",},2000);
        }
      },
  }
};
</script>