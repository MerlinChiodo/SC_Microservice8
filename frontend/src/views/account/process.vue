<template>
  <div class="container">
    <div class="container">
      <div class="row">
        <div class="col">
          <FilesCards :process=0 />
          <UploadCards :for_process="0"/>
        </div>
        <div class="col">
          <NoteCards :process=0 />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilesCards from '../../components/filesCard.vue'
import NoteCards from "../../components/noteCard.vue";
import UploadCards from "../../components/uploadCard.vue";
export default {
  name: "Vorgänge",
  data() {
    return {
      process: null
    };
  },
  components: {
    NoteCards,
    FilesCards,
    UploadCards
  },
  methods: {},
};
</script>
