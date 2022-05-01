<template>
  <div class="container">
    <ProcessCards :processes="processes" :year="year" :sign="sign"/>
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
      processes: [{type:'A',status:'2',name:"Müller"},{type:'B',status:'3',name:"Ano"}],
      year: 2019,
      sign: "Meier"
    };
  },
  components: {
    ProcessCards,
  },
  methods: {},
};
</script>
