<template>
  <div id="app">
    <layout />
  </div>
</template>

<script>
import Layout from "./views/Layout";
export default {
  mounted() {
    this.$root.addBodyClass("page-home");
  },
  components: {
    Layout,
  },
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css";
@import "./assets/css/main.css";

#app {
  width: 100%;
}
</style>
