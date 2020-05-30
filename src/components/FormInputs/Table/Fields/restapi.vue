<template>
  <div>
    <div class="row">
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
import FormTextInput from "../../../Common/FormTextInput";
import schemaFields from "./schemaFields";

export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  components: {
    FormTextInput,
    schemaFields,
  },
  computed: {
    ...mapGetters(["tables"]),
    enabled: {
      get() {
        return this.getRestApiData("enabled");
      },
      set(val) {
        this.setRestApiData("enabled", val);

        if (val) {
          this.setTableFieldsDataInRestApi();
        } else {
          this.$store.dispatch("setRestApiFieldData", {
            index: this.index,
            reset: true,
            value: [],
          });
        }
      },
    },
    createPermission: {
      get() {
        return this.getRestApiData("createPermission");
      },
      set(val) {
        this.setRestApiData("createPermission", val);
      },
    },
    readPermission: {
      get() {
        return this.getRestApiData("readPermission");
      },
      set(val) {
        this.setRestApiData("readPermission", val);
      },
    },
    updatePermission: {
      get() {
        return this.getRestApiData("updatePermission");
      },
      set(val) {
        this.setRestApiData("updatePermission", val);
      },
    },
    deletePermission: {
      get() {
        return this.getRestApiData("deletePermission");
      },
      set(val) {
        this.setRestApiData("deletePermission", val);
      },
    },
    schemaFields() {
      return this.getRestApiData("settings");
    },
  },
  methods: {
    getRestApiData(key) {
      return this.tables[this.index].restapi[key];
    },
    setRestApiData(key, value) {
      if (typeof value === "string") {
        value = value.trim();
      }

      this.$store.dispatch("setTableData", {
        index: this.index,
        key: "restapi",
        value: {
          ...this.tables[this.index].restapi,
          [key]: value,
        },
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

          this.$store.dispatch("addNewRestApiField", {
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
