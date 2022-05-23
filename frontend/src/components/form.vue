<template>
  <div class="row border border-dark pb-4">
    <div class="col-4">
      <h2>{{ title }}</h2>
      {{ target }}<br />
      <a v-bind:href="path" target="_blank" class="btn btn-primary">Download</a>
    </div>
    <div class="col-8 pt-5">
      {{ description }}<br />
      {{ date }}<br />
    </div>
  </div>
</template>

<script>
export default {
  name: "form",
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
    path: {
      type: Text,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
};
</script>