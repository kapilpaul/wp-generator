<template>
  <div class="card">
    <div class="card-header">
      {{ sectionName }}
    </div>

    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sectionName: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>
