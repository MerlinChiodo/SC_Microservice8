<template>
  <div class="container">
    <h2>Upload</h2>
    <br />
    <UploadCard :for_process="2"/>
    <br />
  </div>
</template>

<script>
import UploadCard from "../components/uploadCard.vue";
export default {
  name: "Upload",
  components: {
    UploadCard,
  },
  methods: {},
};
</script>
