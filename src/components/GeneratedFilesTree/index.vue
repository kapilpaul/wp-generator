<template>
  <div class="generated_files_area">
    <v-jstree
      :data="$store.state.fileArchitecture"
      @item-click="itemClick"
      v-if="$store.state.general.pluginName !== ''"
    ></v-jstree>

    <code-modal />
  </div>
</template>

<script>
import VJstree from "vue-jstree";
import CodeModal from "./codemodal";
import $ from "jquery";

export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("setFileArchitecture", true);
  },
  components: {
    VJstree,
    CodeModal,
  },
  methods: {
    itemClick(node) {
      if (typeof node.model.file !== "undefined" && node.model.file) {
        if (typeof node.model.value !== "undefined" && node.model.value) {
          this.$store.dispatch("setActiveFileCodes", node.model.value);
        }
        $("#exampleModal").modal("show");
      }
    },
  },
};
</script>

<style>
.generated_files_area {
  padding: 30px 20px;
  background: #f1f1f1;
  border-radius: 3px;
}
.tree-anchor {
  font-size: 13px !important;
}
.tree-anchor:hover {
  background: #ff0000 !important;
}
.tree-default .tree-selected {
  background: #e1e1e1;
  border: 0;
  box-shadow: none;
}
</style>
