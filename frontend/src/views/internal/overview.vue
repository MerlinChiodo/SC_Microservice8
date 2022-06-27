<template>
  <div class="container">
    <h3>Übersicht</h3>    
  </div>
</template>

<script>
export default {
  name: "Vorgänge",
  mounted: function () {
    if(!this.$cookies.isKey('fm_token')){
      this.workerLogin();
    }
  },
};
</script>
