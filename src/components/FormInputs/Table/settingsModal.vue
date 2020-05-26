<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      :id="'settings-modal-' + index"
      tabindex="-1"
      role="dialog"
      :aria-labelledby="'settings-modal-' + index + 'Label'"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="'settings-modal-' + index + 'Label'">
              Table Name: {{ tableData }}
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
                  <table-fields :index="index" />
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
import { mapGetters } from "vuex";
import TableFields from "./Fields";
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  components: {
    TableFields,
  },
  mounted() {},
  computed: {
    ...mapGetters(["tables"]),
    tableData() {
      return this.tables[this.index].name;
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
.modal-content {
  min-height: 70vh;
  max-height: 90vh;
  overflow-x: scroll;
}
.nav-link {
  display: block;
  padding: 0.5rem 1rem;
  padding: 5px 15px;
}
</style>
