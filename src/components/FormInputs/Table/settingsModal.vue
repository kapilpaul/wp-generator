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

            <ul class="nav mb-0" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  :id="'pills-settings-tab-' + settingsId"
                  data-toggle="pill"
                  :href="'#pills-settings-' + settingsId"
                  role="tab"
                  :aria-controls="'pills-settings-' + settingsId"
                  aria-selected="true"
                  >Settings</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :id="'pills-fields-tab-' + fieldsId"
                  data-toggle="pill"
                  :href="'#pills-fields-' + fieldsId"
                  role="tab"
                  :aria-controls="'pills-fields-' + fieldsId"
                  aria-selected="false"
                  >Fields</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :id="'pills-rest-tab-' + fieldsId"
                  data-toggle="pill"
                  :href="'#pills-rest-' + fieldsId"
                  role="tab"
                  :aria-controls="'pills-rest-' + fieldsId"
                  aria-selected="false"
                  >Rest API</a
                >
              </li>
            </ul>

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
            <div class="">
              <div class="row">
                <div class="col-md-12">
                  <div class="tab-content" id="pills-tabContent">
                    <div
                      class="tab-pane fade show active"
                      :id="'pills-settings-' + settingsId"
                      role="tabpanel"
                      :aria-labelledby="'pills-settings-tab-' + settingsId"
                    >
                      <table-settings :index="index" />
                    </div>

                    <div
                      class="tab-pane fade"
                      :id="'pills-fields-' + fieldsId"
                      role="tabpanel"
                      :aria-labelledby="'pills-fields-tab-' + fieldsId"
                    >
                      <table-fields :index="index" />
                    </div>

                    <div
                      class="tab-pane fade"
                      :id="'pills-rest-' + fieldsId"
                      role="tabpanel"
                      :aria-labelledby="'pills-rest-tab-' + fieldsId"
                    >
                      <rest-api-contents :index="index" />
                    </div>
                  </div>
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
import TableSettings from "./Fields/settings";
import RestApiContents from "@/components/RestApi/settings";
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      settingsId: this.$root.strRandom(),
      fieldsId: this.$root.strRandom(),
    };
  },
  components: {
    TableFields,
    TableSettings,
    RestApiContents,
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
.nav-link.active {
  color: #000;
}
</style>
