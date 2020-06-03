<template>
  <div>
    <div class="row" v-if="showEnableCheckbox">
      <div class="col-md-3">
        <div class="form-group">
          <input
            :id="'rest_api_' + index"
            type="checkbox"
            :name="'rest_api_' + index"
            v-model="enabled"
          />
          <label :for="'rest_api_' + index" class="checkbox">Rest API</label>
        </div>
      </div>
    </div>

    <div v-if="enabled">
      <div class="row">
        <div class="col-md-4">
          <form-text-input
            label="Rest API Class Name"
            placeholder="Addressbook"
            v-model="className"
            :textvalue="className"
          />
        </div>
        <div class="col-md-4">
          <form-text-input
            label="Namespace"
            placeholder="wpgenerator/v1"
            v-model="namespace"
            :textvalue="namespace"
          />
        </div>
        <div class="col-md-4">
          <form-text-input
            label="Rest Base"
            placeholder="contacts"
            v-model="restbase"
            :textvalue="restbase"
          />
        </div>

        <div class="col-md-6">
          <form-text-input
            label="Create Permission"
            placeholder="manage_options (left blank for publicly accessible)"
            v-model="createPermission"
            :textvalue="createPermission"
          />
        </div>
        <div class="col-md-6">
          <form-text-input
            label="Read Permission"
            placeholder="manage_options (left blank for publicly accessible)"
            v-model="readPermission"
            :textvalue="readPermission"
          />
        </div>
        <div class="col-md-6">
          <form-text-input
            label="Update Permission"
            placeholder="manage_options (left blank for publicly accessible)"
            v-model="updatePermission"
            :textvalue="updatePermission"
          />
        </div>
        <div class="col-md-6">
          <form-text-input
            label="Delete Permission"
            placeholder="manage_options (left blank for publicly accessible)"
            v-model="deletePermission"
            :textvalue="deletePermission"
          />
        </div>
      </div>

      <!-- schema fields -->
      <div class="row mt-20">
        <div class="col-md-12">
          <p>Schema Fields</p>
        </div>

        <div
          class="col-md-12"
          v-for="(item, fieldIndex) in schemaFields"
          :key="fieldIndex"
        >
          <schema-fields :index="index" :field-index="fieldIndex" />
        </div>

        <div class="col-md-12" v-if="schemaFields.length === 0">
          <p class="text-warning">Please add some table fields first!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { slug, titleCase } from "@/utils/helpers";
import FormTextInput from "@/components/Common/FormTextInput";
import schemaFields from "./schemaFields";
import { CodeBase } from "@/codebase/index";

export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    showEnableCheckbox: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "",
    },
  },
  components: {
    FormTextInput,
    schemaFields,
  },
  computed: {
    ...mapGetters(["tables", "restapi"]),
    enabled: {
      get() {
        return this.getRestApiData("enabled");
      },
      set(val) {
        this.setRestApiData("enabled", val);

        if (val) {
          this.setTableFieldsDataInRestApi();
        } else {
          this.$store.dispatch("setRestApiData", {
            index: this.index,
            reset: true,
            value: [],
          });
        }
      },
    },
    className: {
      get() {
        return this.getRestApiData("className");
      },
      set(val) {
        val = titleCase(val, "_");
        this.setRestApiData("className", val);

        if (this.type !== "single") {
          this.$store.dispatch("addNewFileInFileTree", {
            id: "api_file_" + this.index,
            type: "php",
            file: true,
            name: val + ".php",
            parent_id: "includes_api",
            replace: true,
            value: () => {
              return CodeBase.restapiCode(
                this.$store.getters.general,
                this.$store.getters.restapi[this.index],
                this.$store.getters.tables[this.index].settings
              );
            },
          });
        }
      },
    },
    namespace: {
      get() {
        return this.getRestApiData("namespace");
      },
      set(val) {
        val = slug(val, "-");
        this.setRestApiData("namespace", val);
      },
    },
    restbase: {
      get() {
        return this.getRestApiData("restbase");
      },
      set(val) {
        val = slug(val, "-");
        this.setRestApiData("restbase", val);
      },
    },
    createPermission: {
      get() {
        return this.getRestApiData("createPermission");
      },
      set(val) {
        val = slug(val, "_");
        this.setRestApiData("createPermission", val);
      },
    },
    readPermission: {
      get() {
        return this.getRestApiData("readPermission");
      },
      set(val) {
        val = slug(val, "_");
        this.setRestApiData("readPermission", val);
      },
    },
    updatePermission: {
      get() {
        return this.getRestApiData("updatePermission");
      },
      set(val) {
        val = slug(val, "_");
        this.setRestApiData("updatePermission", val);
      },
    },
    deletePermission: {
      get() {
        return this.getRestApiData("deletePermission");
      },
      set(val) {
        val = slug(val, "_");
        this.setRestApiData("deletePermission", val);
      },
    },
    schemaFields() {
      return this.getRestApiData("schemaFields");
    },
  },
  methods: {
    getRestApiData(key) {
      return this.restapi[this.index][key];
    },
    setRestApiData(key, value) {
      if (typeof value === "string") {
        value = value.trim();
      }

      this.$store.dispatch("setRestApiData", {
        index: this.index,
        key: key,
        value: value,
      });
    },
    setTableFieldsDataInRestApi() {
      let tableFields = this.tables[this.index].fields;

      tableFields
        .filter((item) => {
          return item.name && item.type;
        })
        .map((item) => {
          let type = item.type === "INT" ? "integer" : "string";

          this.$store.dispatch("addNewRestApiSchemaField", {
            index: this.index,
            value: {
              propertyKey: item.name,
              type: type,
              context: "view, edit",
              format: "",
              readonly: false,
              required: false,
              sanitize: false,
              description: "",
            },
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
