<template>
  <div class="container">
    <h2>Formulare</h2>
    <br />
    <FormCard
      :description="description"
      :title="title"
      :target="target"
      :path="path"
      :date="date"
    />
    <br />
  </div>
</template>

<script>
import FormCard from "../components/form.vue";
export default {
  name: "Blog",
  data() {
    return {
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. At vitae laboriosam dolore debitis blanditiis delectus accusantium dicta, impedit sit asperiores quas veritatis fugit ea illum sed, alias reprehenderit itaque.",
      title: "Formular 1",
      target: "Rentner",
      path: "http://vps2290194.fastwebserver.de:9780/api/files/48a7f33f-cd3a-4e38-addc-2df4a095aaad.pdf",
      date: "2021-01-01 10:00",
    };
  },
  components: {
    FormCard,
  },
  methods: {},
};
</script>
