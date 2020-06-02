<template>
  <div>
    <div class="row">
      <div class="col-2">
        <form-text-input
          label="Property Key"
          placeholder="id"
          v-model="propertyKey"
          :textvalue="propertyKey"
        />
      </div>

      <div class="col">
        <form-text-input
          label="Type"
          placeholder="string"
          v-model="type"
          :textvalue="type"
        />
      </div>

      <div class="col-2">
        <form-text-input
          label="Description"
          placeholder="Name of the contact"
          v-model="description"
          :textvalue="description"
        />
      </div>

      <div class="col">
        <form-text-input
          label="Context"
          placeholder="view, edit"
          v-model="context"
          :textvalue="context"
        />
      </div>

      <div class="col">
        <form-text-input
          label="Format (Optional)"
          placeholder="date-time"
          v-model="format"
          :textvalue="format"
        />
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
import FormTextInput from "../../../Common/FormTextInput";

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
    ...mapGetters(["tables", "singleRestapi"]),
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
        return this.getData("context");
      },
      set(val) {
        this.setData("context", val);
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
      if (this.apiType === "single") {
        return this.singleRestapi.schemaFields[this.index][key];
      }

      return this.tables[this.index].restapi.schemaFields[this.fieldIndex][key];
    },
    setData(key, value, slugCase = true) {
      value = slugCase ? slug(value, "_") : value;

      if (this.apiType === "single") {
        this.$store.dispatch("setSingleRestApiFieldData", {
          index: this.index,
          key: key,
          value: value,
        });
      } else {
        this.$store.dispatch("setRestApiFieldData", {
          index: this.index,
          fieldIndex: this.fieldIndex,
          key: key,
          value: value,
        });
      }
    },
    delField() {
      if (this.apiType === "single") {
        this.$store.dispatch("deleteSingleRestApiField", {
          index: this.index,
        });
      } else {
        this.$store.dispatch("deleteRestApiField", {
          index: this.index,
          fieldIndex: this.fieldIndex,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
