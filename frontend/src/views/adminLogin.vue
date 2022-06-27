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
        this.$cookies.set("fm_token", "finanzamt-worker-"+this.$route.query.token, "1h");
        window.location = this.$route.params.destination;
      }
  },
};
</script>
