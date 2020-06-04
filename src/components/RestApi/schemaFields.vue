<template>
  <div
    class="schema_field_area"
    :class="{ schema_field_area_first_child: fieldIndex === 0 }"
  >
    <div class="row">
      <div class="col">
        <form-text-input
          label="Property Key"
          placeholder="id"
          v-model="propertyKey"
          :textvalue="propertyKey"
        />
      </div>

      <div class="col">
        <div class="form-group">
          <label for="type">Type</label>
          <div class="select-wrapper">
            <select id="type" name="type" v-model="type">
              <option value="string">string</option>
              <option value="integer">integer</option>
              <option value="array">array</option>
              <option value="boolean">boolean</option>
              <option value="null">null</option>
              <option value="number">number</option>
              <option value="object">object</option>
            </select>
          </div>
        </div>
      </div>

      <div class="col">
        <form-text-input
          label="Description"
          placeholder="Name of the contact"
          v-model="description"
          :textvalue="description"
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="context">Context</label>
          <div class="select-wrapper">
            <select id="context" name="context" multiple v-model="context">
              <option value="view">View</option>
              <option value="edit">Edit</option>
              <option value="embed">Embed</option>
            </select>
          </div>
        </div>
      </div>

      <div class="col-3">
        <div class="form-group">
          <label for="format">Format (Optional)</label>
          <div class="select-wrapper">
            <select id="format" name="format" v-model="format">
              <option value=""></option>
              <option value="date-time">date-time</option>
              <option value="uri">uri</option>
              <option value="email">email</option>
            </select>
          </div>
        </div>
      </div>

      <div class="col-1">
        <div class="form-group mr-25">
          <label>Readonly</label>
          <input
            :id="`rest-api-readonly${index}-${fieldIndex}`"
            class="switch"
            type="checkbox"
            v-model="readonly"
          />
          <label
            :for="`rest-api-readonly${index}-${fieldIndex}`"
            class="switch"
          ></label>
        </div>
      </div>

      <div class="col-1">
        <div class="form-group mr-25">
          <label>Required</label>
          <input
            :id="`rest-api-required${index}-${fieldIndex}`"
            class="switch"
            type="checkbox"
            v-model="required"
          />
          <label
            :for="`rest-api-required${index}-${fieldIndex}`"
            class="switch"
          ></label>
        </div>
      </div>

      <div class="col-1">
        <div class="form-group mr-25">
          <label>Sanitize</label>
          <input
            :id="`rest-api-sanitize${index}-${fieldIndex}`"
            class="switch"
            type="checkbox"
            v-model="sanitize"
          />
          <label
            :for="`rest-api-sanitize${index}-${fieldIndex}`"
            class="switch"
          ></label>
        </div>
      </div>

      <div class="col-1">
        <div class="form-group">
          <button
            class="button btn-danger button-s del-btn"
            role="button"
            @click.prevent="delField"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { slug, titleCase } from "@/utils/helpers";
import FormTextInput from "@/components/Common/FormTextInput";

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
    apiType: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters(["tables", "restapi"]),
    propertyKey: {
      get() {
        return this.getData("propertyKey");
      },
      set(val) {
        val = slug(val, "_");
        this.setData("propertyKey", val);
      },
    },
    type: {
      get() {
        if (this.getData("type") === "") {
          this.setData("type", "string");
        }

        return this.getData("type");
      },
      set(val) {
        val = slug(val, "_");
        this.setData("type", val);
      },
    },
    description: {
      get() {
        return this.getData("description");
      },
      set(val) {
        this.setData("description", val, false);
      },
    },
    context: {
      get() {
        let context = this.getData("context");
        return context.split(",");
      },
      set(val) {
        this.setData("context", val.join());
      },
    },
    format: {
      get() {
        return this.getData("format");
      },
      set(val) {
        val = slug(val, "-");
        this.setData("format", val);
      },
    },
    readonly: {
      get() {
        return this.getData("readonly");
      },
      set(val) {
        this.setData("readonly", val, false);
      },
    },
    required: {
      get() {
        return this.getData("required");
      },
      set(val) {
        this.setData("required", val, false);
      },
    },
    sanitize: {
      get() {
        return this.getData("sanitize");
      },
      set(val) {
        this.setData("sanitize", val, false);
      },
    },
  },
  components: {
    FormTextInput,
  },
  methods: {
    getData(key) {
      return this.restapi[this.index].schemaFields[this.fieldIndex][key];
    },
    setData(key, value, slugCase = true) {
      value = slugCase ? slug(value, "_") : value;

      this.$store.dispatch("setRestApiSchemaFieldData", {
        index: this.index,
        fieldIndex: this.fieldIndex,
        key: key,
        value: value,
      });
    },
    delField() {
      this.$store.dispatch("deleteRestApiSchemaField", {
        index: this.index,
        fieldIndex: this.fieldIndex,
      });
    },
  },
};
</script>

<style>
.schema_field_area {
  border-top: 1px solid #f1f1f1;
  padding-top: 15px;
  margin-top: 20px;
}
</style>

<style scoped>
.schema_field_area_first_child {
  border-top: 0px solid #f1f1f1;
  padding-top: 0px;
  margin-top: 0px;
}
</style>
