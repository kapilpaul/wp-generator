<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="codeModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="codeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="codeModalLabel">
              {{ $store.getters.pluginName }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-left">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <div class="tree_area">
                    <v-jstree
                      :data="$store.state.fileArchitecture"
                      v-if="$store.state.general.pluginName !== ''"
                      @item-click="itemClick"
                    ></v-jstree>
                  </div>
                </div>

                <div class="col-md-9">
                  <copy-button />
                  <code-highlight>{{ activeCode }}</code-highlight>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../prism";
import VJstree from "vue-jstree";
import CodeHighlight from "vue-code-highlight/src/CodeHighlight";
import CopyButton from "@/components/Common/CopyButton";

export default {
  components: {
    VJstree,
    CodeHighlight,
    CopyButton,
  },
  mounted() {},
  computed: {
    activeCode() {
      return this.$store.getters.activeFileCodes;
    },
  },
  methods: {
    itemClick(node) {
      if (typeof node.model.file !== "undefined" && node.model.file) {
        if (typeof node.model.value !== "undefined" && node.model.value) {
          this.$store.dispatch("setActiveFileCodes", node.model.value);
        }
      }
    },
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  .modal-lg,
  .modal-xl {
    max-width: 1350px;
  }
}
.tree {
  max-height: 70vh;
}
</style>

<style>
pre[class*="language-"] {
  width: 100%;
  height: 70vh;
  border-radius: 4px;
}

code[class*="language-"],
pre[class*="language-"] {
  font-size: 13px;
}
</style>
