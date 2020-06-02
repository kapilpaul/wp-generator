<template>
  <div>
    <div v-if="adminPanel && showInCrudForm">
      <div class="row">
        <div class="col-md-2">
          <div class="form-group">
            <label for="country">Input Type</label>
            <div class="select-wrapper">
              <select id="type" name="type" v-model="formInputType">
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="textarea">Text Area</option>
                <option value="dropdown">Dropdown</option>
                <option value="checkbox">Checkbox</option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <form-text-input
            label="Input Label"
            v-model="formInputLabel"
            :textvalue="formInputLabel"
          />
        </div>
        <div class="col-md-3">
          <form-text-input
            label="Placeholder"
            v-model="formInputPlaceholder"
            :textvalue="formInputPlaceholder"
          />
        </div>

        <div class="col-md-3" v-if="formInputType === 'dropdown'">
          <form-text-input
            label="Values"
            placeholder="key:value pair, comma separated"
            v-model="formInputValues"
            :textvalue="formInputValues"
          />
        </div>

        <div class="col-md-1">
          <div class="form-group">
            <label>Required</label>
            <input
              :id="`field-required${index}-${fieldIndex}`"
              class="switch"
              type="checkbox"
              v-model="formInputRequired"
            />
            <label
              :for="`field-required${index}-${fieldIndex}`"
              class="switch"
            ></label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-2">
          <div class="form-group">
            <label>Show In List Table</label>
            <input
              :id="`show-field-list-table${index}-${fieldIndex}`"
              class="switch"
              type="checkbox"
              v-model="showInListTable"
            />
            <label
              :for="`show-field-list-table${index}-${fieldIndex}`"
              class="switch"
            ></label>
          </div>
        </div>

        <div class="col-md-10" v-if="showInListTable">
          <div class="row">
            <div class="col-md-3">
              <form-text-input
                label="Column Name"
                v-model="listTableColumnName"
                :textvalue="listTableColumnName"
              />
            </div>

            <div class="col-md-2">
              <div class="form-group">
                <label>Sortable Column</label>
                <input
                  :id="`sortable-field-list-table${index}-${fieldIndex}`"
                  class="switch"
                  type="checkbox"
                  v-model="sortableInListTable"
                />
                <label
                  :for="`sortable-field-list-table${index}-${fieldIndex}`"
                  class="switch"
                ></label>
              </div>
            </div>

            <div class="col-md-2">
              <div class="form-group">
                <label>Link Actions</label>
                <input
                  :id="`link-field-list-table${index}-${fieldIndex}`"
                  class="switch"
                  type="checkbox"
                  v-model="linkActionInListTable"
                />
                <label
                  :for="`link-field-list-table${index}-${fieldIndex}`"
                  class="switch"
                ></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormTextInput from "../../../Common/FormTextInput";
import { mapGetters } from "vuex";
import { slug, titleCase } from "../../../../utils/helpers";
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    fieldIndex: {
      type: Number,
      default: 0,
    },
  },
  components: {
    FormTextInput,
  },
  computed: {
    ...mapGetters(["tables"]),
    adminPanel() {
      return this.tables[this.index].settings.adminPanel;
    },
    showInCrudForm() {
      return this.tables[this.index].fields[this.fieldIndex].showInCrudForm;
    },
    formInputType: {
      get() {
        if (typeof this.getData("formInputType") === "undefined") {
          this.setData("formInputType", "text");
          return "text";
        }

        return this.getData("formInputType");
      },
      set(val) {
        this.setData("formInputType", val);
      },
    },
    formInputLabel: {
      get() {
        if (
          typeof this.getData("formInputLabel") === "undefined" ||
          this.getData("formInputLabel") === ""
        ) {
          let formInputLabel = titleCase(this.getData("name"), " ").replace(
            /_/g,
            " "
          );

          this.formInputLabel = formInputLabel;
          return formInputLabel;
        }
        return this.getData("formInputLabel");
      },
      set(val) {
        this.setData("formInputLabel", val);
      },
    },
    formInputPlaceholder: {
      get() {
        return this.getData("formInputPlaceholder");
      },
      set(val) {
        this.setData("formInputPlaceholder", val);
      },
    },
    formInputValues: {
      get() {
        return this.getData("formInputValues");
      },
      set(val) {
        this.setData("formInputValues", val);
      },
    },
    formInputRequired: {
      get() {
        return this.getData("formInputRequired");
      },
      set(val) {
        this.setData("formInputRequired", val);
      },
    },
    showInListTable: {
      get() {
        return this.getData("showInListTable");
      },
      set(val) {
        this.setData("showInListTable", val);
      },
    },
    sortableInListTable: {
      get() {
        return this.getData("sortableInListTable");
      },
      set(val) {
        this.setData("sortableInListTable", val);
      },
    },
    linkActionInListTable: {
      get() {
        return this.getData("linkActionInListTable");
      },
      set(val) {
        this.setData("linkActionInListTable", val);
      },
    },
    listTableColumnName: {
      get() {
        if (
          typeof this.getData("listTableColumnName") === "undefined" ||
          this.getData("listTableColumnName") === ""
        ) {
          let listTableColumnName = titleCase(
            this.getData("name"),
            " "
          ).replace(/_/g, " ");
          this.listTableColumnName = listTableColumnName;
          return listTableColumnName;
        }

        return this.getData("listTableColumnName");
      },
      set(val) {
        this.setData("listTableColumnName", val);
      },
    },
  },
  methods: {
    getData(key) {
      return this.tables[this.index].fields[this.fieldIndex][key];
    },
    setData(key, value, slugCase = false) {
      value = slugCase ? slug(value, "_") : value;

      this.$store.dispatch("setTableFieldData", {
        index: this.index,
        fieldIndex: this.fieldIndex,
        key: key,
        value: value,
      });
    },
  },
};
</script>

<style>
.form-wpgen .select-wrapper:before {
  top: -3px !important;
}
</style>
