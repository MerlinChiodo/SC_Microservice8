<template>
  <div class="container">
    <h3>Vorgänge</h3>
    <ProcessCards :processes="processes" :year="year"/>
    <br>
    <button type="button" @click="newProcess()" class="btn btn-primary">
      Neuer Vorgang
    </button>
  </div>
</template>

<script>
import ProcessCards from "../processCard.vue";
export default {
  name: "Vorgänge",
  data() {
    return {
      processes: [{type:'A',status:'2'},{type:'B',status:'1'},{type:'C',status:'3'},{type:'D',status:'0'}],
      year: 2019,
    };
  },
  components: {
    ProcessCards,
  },
  methods: {},
};
</script>
