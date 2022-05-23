<template>
  <div class="row border border-dark pb-4">
    <div class="col-4">
      <h2>{{ title }}</h2>
      {{ target }}<br />
      <img
        v-bind:src="image"
        class="rounded img-fluid"
        alt="Blog-Eintrag Bild"
      />
    </div>
    <div class="col-8 pt-5">
      {{ description }}<br />
      {{ date }}<br />
    </div>
  </div>
</template>

<script>
export default {
  name: "Blog-Eintrag",
  props: {
    description: {
      type: Text,
      required: true,
    },
    title: {
      type: Text,
      required: true,
    },
    target: {
      type: Text,
      required: false,
    },
    image: {
      type: Text,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
  },
};
</script>