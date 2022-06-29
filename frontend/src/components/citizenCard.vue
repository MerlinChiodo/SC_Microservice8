<template>
  <div class="container">
    <h4 v-if="!citizens || citizens.length==0">Keine Bürger gefunden</h4>
    <div v-else v-for="item in citizens" :key="item.id">
        <div class="processWrapper" v-if="item.process.length>0">
            <div class="col-4" >
                <h4>Von: {{ item.lastname }}, {{ item.name }} - {{item.email}}</h4>
                <div v-for="pitem in item.process" :key="pitem.id">
                    <a :href="'vorgang/?id=' + pitem.id">Vorgang {{pitem.processTypes.name}}</a>
                </div>
                <a :href="'vorgaenge/' + item.id" class="btn btn-primary btn-lg" tabindex="-1" role="button">Übersicht</a>
            </div>
            <br>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bürger",
  props: {
    citizens: {
      type: Array,
      required: true,
    }
  },
};
</script>