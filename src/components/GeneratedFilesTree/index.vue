<template>
  <div class="generated_files_area">
    <v-jstree
      :data="$store.state.fileArchitecture"
      @item-click="itemClick"
      v-if="$store.state.general.pluginName !== ''"
    ></v-jstree>

    <p v-else><i>No Preview Available</i></p>

    <code-modal v-if="$store.state.general.pluginName !== ''" />
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
      this.$store.dispatch("setFileArchitecture", true).then((response) => {
        if (typeof node.model.file !== "undefined" && node.model.file) {
          if (typeof node.model.value !== "undefined" && node.model.value) {
            this.$store.dispatch("setActiveFileName", node.model.text);
            this.$store.dispatch("setActiveFileCodes", node.model.value);
          }
          $("#codeModal").modal("show");
        }
      });
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
.tree {
  text-align: left;
  overflow: scroll;
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
