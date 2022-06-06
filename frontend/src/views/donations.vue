<template>
  <div class="container">
    <h2>Spenden</h2>
    <br />
    <donationCard :company=false />
    
    <br />
    <donationCard :company=true />
    <br />
  </div>
</template>

<script>
import donationCard from "../components/donationCard.vue";
export default {
  name: "Blog",
  data() {},
  components: {
    donationCard,
  },
  methods: {},
};
</script>
