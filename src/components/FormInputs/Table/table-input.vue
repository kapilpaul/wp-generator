<template>
  <div class="row">
    <div class="col-md-9">
      <div class="form-group">
        <label for="name">Table Name</label>
        <input type="text" v-model="name" autocomplete="off" />
      </div>
    </div>

    <div class="col-md-3">
      <div class="form-group">
        <button
          class="button button-primary button-s table_settings_btn mr-5"
          role="button"
          data-toggle="modal"
          :data-target="'#settings-modal-' + index"
          v-if="name !== ''"
        >
          Settings
        </button>

        <button
          class="button btn-danger button-s del-btn"
          role="button"
          @click.prevent="delTable"
        >
          <i class="fas fa-times"></i>
        </button>

        <settings-modal :index="index" v-if="name !== ''" />
      </div>
    </div>
  </div>
</template>

<script>
import { slug } from "../../../utils/helpers";
import SettingsModal from "./settingsModal";

export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  components: {
    SettingsModal,
  },
  computed: {
    name: {
      get() {
        let table = this.$store.getters.tables;
        return table[this.index].name;
      },
      set(val) {
        this.$store.dispatch("setTableData", {
          index: this.index,
          key: "name",
          value: slug(val, "_"),
        });
      },
    },
  },
  methods: {
    delTable() {
      this.$store
        .dispatch("addNewFileInFileTree", {
          id: "includes_crud_admin_file_" + this.index,
          replace: true,
        })
        .then((response) => {
          //delete list table php file
          this.$store.dispatch("addNewFileInFileTree", {
            id: "includes_crud_admin_list_file_" + this.index,
            replace: true,
          });

          this.$store.dispatch("deleteCrudViewFile", {
            index: this.index,
          });

          this.$store.dispatch("deleteTable", {
            index: this.index,
          });

          this.$store.dispatch("deleteRestApi", {
            index: this.index,
          });
        });
    },
  },
};
</script>

<style scoped>
.table_settings_btn {
  margin-top: 30px;
}
</style>
