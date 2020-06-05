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
  beforeCreate() {
    var wpgenData = localStorage.getItem("wpgen");

    if (wpgenData) {
      wpgenData = JSON.parse(wpgenData);

      Object.keys(wpgenData).map((key, index) => {
        this.$store.dispatch("setStateData", {
          key: key,
          value: wpgenData[key],
        });
      });

      //set pluginname
      this.$store.dispatch("setPluginName", wpgenData.general.pluginName);
    }
  },
  components: {
    Layout,
  },
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css";

#app {
  width: 100%;
}
</style>
