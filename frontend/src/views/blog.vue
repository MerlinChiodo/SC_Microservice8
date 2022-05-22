<template>
  <div class="container">
    <h2>Aktuelles</h2>
    <br />
    <BlogCard
      :description="description"
      :title="title"
      :target="target"
      :image="image"
      :date="date"
    />
    <br />
  </div>
</template>

<script>
import BlogCard from "../components/blogEntry.vue";
export default {
  name: "Blog",
  data() {
    return {
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. At vitae laboriosam dolore debitis blanditiis delectus accusantium dicta, impedit sit asperiores quas veritatis fugit ea illum sed, alias reprehenderit itaque.",
      title: "Entry 1",
      target: "Rentner",
      image:
        "http://vps2290194.fastwebserver.de:9780/api/files/abc0d25a-550d-4359-b4a7-8cd35c287083.png",
      date: "2021-01-01 10:00",
    };
  },
  components: {
    BlogCard,
  },
  methods: {},
};
</script>
