<template>
  <div>
    <div class="row">
      <!-- Base Namespace-->
      <general-text-input
        label="Base Namespace"
        objkey="baseNamespace"
        convert-case="title"
        helptext="Plugin initial namespace. ex: WPGenerator\Weather"
        placeholder="WPGenerator\Weather"
      />

      <!-- Function Prefix -->
      <general-text-input
        label="Function Prefix"
        objkey="functionPrefix"
        convert-case="slug"
        separator="_"
        helptext="Plugin function prefix. ex: wf_get_results"
        placeholder="wf_get_results"
      />

      <div class="col-md-6">
        <form-text-input
          label="Singular Name"
          placeholder="book"
          v-model="singularName"
          :textvalue="singularName"
        />
      </div>
      <div class="col-md-6">
        <form-text-input
          label="Plural Name"
          placeholder="books"
          v-model="pluralName"
          :textvalue="pluralName"
        />
      </div>

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

      <div class="col-md-12" v-for="(item, index) in schemaFields" :key="index">
        <schema-fields :index="index" api-type="single" />
      </div>

      <div class="col-md-12">
        <button
          class="button button-primary button-s"
          role="button"
          @click.prevent="addnew"
        >
          ADD
        </button>

        <button
          class="ml-10 button button-primary button-s"
          role="button"
          @click.prevent="previewModal"
        >
          Preview
        </button>

        <preview />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { slug, titleCase } from "@/utils/helpers";
import FormTextInput from "@/components/Common/FormTextInput";
import GeneralTextInput from "@/components/FormInputs/textInput";
import SchemaFields from "@/components/FormInputs/Table/Fields/schemaFields";
import preview from "./preview";
import { CodeBase } from "@/codebase/index";
import $ from "jquery";

export default {
  data() {
    return {
      singularName: "",
      pluralName: "",
    };
  },
  components: {
    FormTextInput,
    GeneralTextInput,
    SchemaFields,
    preview,
  },
  computed: {
    ...mapGetters(["singleRestapi"]),
    className: {
      get() {
        return this.getRestApiData("className");
      },
      set(val) {
        val = titleCase(val, "_");
        this.setRestApiData("className", val);
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
      return this.singleRestapi[key];
    },
    setRestApiData(key, value) {
      if (typeof value === "string") {
        value = value.trim();
      }

      this.$store.dispatch("setSingleRestApiData", {
        index: this.index,
        key: key,
        value: value,
      });
    },
    addnew() {
      this.$store.dispatch("addSingleRestApiSchemaField", true);
    },
    previewModal() {
      let code = CodeBase.restapiCode(
        this.$store.getters.general,
        this.$store.getters.singleRestapi,
        {
          singularName: this.singularName,
          pluralName: this.pluralName,
        },
        true
      );

      this.$store.dispatch("setActiveFileCodes", code);

      $("#codeModal").modal("show");
    },
  },
};
</script>

<style lang="scss" scoped></style>
