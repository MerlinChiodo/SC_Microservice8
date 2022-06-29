<template>
  <div class="container">
    <h2>Formulare</h2>
    <br />
    <FormCard :forms="forms" :admin="this.$cookies.isKey('fm_token')"/>
    <br />
  </div>
</template>

<script>
import FormCard from "../components/form.vue";
export default {
  name: "Blog",
  data() {
    return {
      forms: []
    };
  },
  components: {
    FormCard,
  },
  mounted: function(){
      this.getForms();
      console.log(this.forms);
  },
  methods: {
    async getForms(){
      let data = await this.fetch_get({} , '/api/forms/all' );
      if(data){
        console.log(data.result)
        this.forms = data.result
      }else{
        this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",},2000);
      }
    }
  },
};
</script>
