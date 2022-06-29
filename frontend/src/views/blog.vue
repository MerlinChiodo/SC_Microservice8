<template>
  <div class="container">
    <h2>Aktuelles</h2>
    <br />
    <BlogCard :entries="entries" :admin="this.$cookies.isKey('fm_token')" />
    <br />
  </div>
</template>

<script>
import BlogCard from "../components/blogEntry.vue";
export default {
  name: "Blog",
  data() {
    return {
      entries: []
    };
  },
  components: {
    BlogCard,
  },
  mounted: function(){
      this.getEntries();
  },
  methods: {
    async getEntries(){
      let data = await this.fetch_get({} , '/api/blogEntries/all' );
      if(data){
        this.entries = data.result
      }else{
        this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",},2000);
      }
    }
  },
};
</script>
