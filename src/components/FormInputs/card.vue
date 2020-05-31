<template>
  <div class="card">
    <div
      class="card-header"
      data-toggle="collapse"
      :data-target="'#' + divid"
      aria-expanded="false"
      :aria-controls="'#' + divid"
    >
      {{ sectionName }}
    </div>

    <div class="card-body collapse show" :id="divid">
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
  data() {
    return {
      divid: "",
    };
  },
  mounted() {
    this.divid = this.$root.strRandom();
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
.card-header {
  cursor: pointer;
}
</style>
