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

      <div class="col-md-12">
        <rest-api-contents :show-enable-checkbox="false" type="single" />
      </div>
    </div>

    <!-- schema fields -->
    <div class="row mt-20">
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
          v-if="className"
        >
          Preview
        </button>

        <preview v-if="className" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { slug, titleCase } from "@/utils/helpers";
import FormTextInput from "@/components/Common/FormTextInput";
import GeneralTextInput from "@/components/FormInputs/textInput";
import RestApiContents from "./settings";
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
  beforeCreate() {
    this.$store.dispatch("setRestApiData", {
      index: 0,
      type: "reset",
      value: {
        enabled: true,
        schemaFields: [],
      },
    });
  },
  components: {
    FormTextInput,
    GeneralTextInput,
    RestApiContents,
    preview,
  },
  computed: {
    ...mapGetters(["restapi"]),
    className() {
      let name = this.restapi[0]["className"];

      if (typeof name !== "undefined" && name !== "") {
        return name;
      }

      return false;
    },
  },
  methods: {
    addnew() {
      this.$store.dispatch("addNewRestApiSchemaField", {
        index: 0,
        new: true,
      });
    },
    previewModal() {
      let code = CodeBase.restapiCode(
        this.$store.getters.general,
        this.$store.getters.restapi[0],
        {
          singularName: this.singularName,
          pluralName: this.pluralName,
        },
        true
      );

      this.$store.dispatch(
        "setActiveFileName",
        `${this.$store.getters.restapi[0].className}.php`
      );
      this.$store.dispatch("setActiveFileCodes", code);

      $("#codeModal").modal("show");
    },
  },
};
</script>

<style lang="scss" scoped></style>
