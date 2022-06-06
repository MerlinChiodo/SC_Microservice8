<template>
  <div class="container">
    <h3>Dateien</h3>
    <div class="notizen">
      <p v-for="item in allFiles" :key="item.id">
        <a :href="`/api/files/${item.path}?token=1234`">
            [{{ item.path.split(".")[1] }}] Datei ansehen
        </a><br />
        Upload-Datum: {{ isoDateToString(item.date) }}
      </p>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  name: "Dateien",
  data() {
    return {
      allFiles: [],
    };
  },
  props: {
    process: {
      type: Number,
      required: true,
    },
  },
  mounted: function () {
    this.loadFiles();
  },
  methods: {
    loadFiles() {
      const options = {
        method: "GET",
        headers: { token: "1234", process: this.process },
      };
      fetch("/api/files/all", options)
        .then((response) => response.json())
        .then((data) => {
          this.allFiles = data.result;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>