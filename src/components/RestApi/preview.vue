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
              REST API
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
                <div class="col-md-12">
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
import CodeHighlight from "vue-code-highlight/src/CodeHighlight";
import CopyButton from "@/components/Common/CopyButton";

export default {
  components: {
    CodeHighlight,
    CopyButton,
  },
  mounted() {},
  computed: {
    activeCode() {
      return this.$store.getters.activeFileCodes;
    },
  },
  methods: {},
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
