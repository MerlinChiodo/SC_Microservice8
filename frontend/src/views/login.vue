<template>
  <div class="container">
    <h2>Login</h2>
  </div>
</template>

<script>
export default {
  name: "Login",
  mounted: function(){
      this.process_login()
  },
  methods: {
      process_login(){
        window.location.href = window.location.protocol + '//' + window.location.host + this.$route.params.destination;
      }
  },
};
</script>
