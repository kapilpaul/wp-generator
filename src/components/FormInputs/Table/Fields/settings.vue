<template>
  <div>
    <div class="row">
      <div class="col-md-3">
        <div class="form-group">
          <input
            :id="'admin_panel_' + index"
            type="checkbox"
            :name="'admin_panel_' + index"
            v-model="adminPanel"
          />
          <label :for="'admin_panel_' + index" class="checkbox"
            >Admin Panel</label
          >
        </div>
      </div>
    </div>

    <div class="row">
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
    </div>

    <div class="row" v-if="adminPanel">
      <div class="col-md-3">
        <form-text-input
          label="Class Name"
          placeholder="AddressBook"
          v-model="crudClassName"
          :textvalue="crudClassName"
        />
      </div>

      <div class="col-md-3">
        <form-text-input
          label="File Name Prefix"
          placeholder="addressbook"
          v-model="fileNamePrefix"
          :textvalue="fileNamePrefix"
        />
      </div>
      <div class="col-md-3">
        <form-text-input
          label="Nonce Key"
          v-model="nonceKey"
          :textvalue="nonceKey"
        />
      </div>
      <div class="col-md-3">
        <form-text-input
          label="Submit Button Text"
          placeholder="Submit Address"
          v-model="submitButtonText"
          :textvalue="submitButtonText"
        />
      </div>
      <div class="col-md-3">
        <form-text-input
          label="Update Button Text"
          placeholder="Update Address"
          v-model="updateButtonText"
          :textvalue="updateButtonText"
        />
      </div>
      <div class="col-md-3">
        <form-text-input
          label="Submit Name"
          placeholder="submit_addressbook"
          v-model="submitName"
          :textvalue="submitName"
        />
      </div>

      <div class="col-md-3">
        <form-text-input
          label="No Items Text"
          placeholder="No books found"
          v-model="noItemFoundText"
          :textvalue="noItemFoundText"
        />
      </div>
      <div class="col-md-3">
        <form-text-input
          label="Items Per Page"
          placeholder="20"
          v-model="perPage"
          :textvalue="perPage"
        />
      </div>
    </div>

    <div class="row" v-if="adminPanel">
      <div class="col-md-12">
        <p class="pt-20 pb-10"><b>Menu Setup</b></p>
      </div>
      <div class="col-md-3">
        <form-text-input
          label="Menu Title"
          placeholder="Address Book"
          v-model="menuTitle"
          :textvalue="menuTitle"
        />
      </div>
      <div class="col-md-3">
        <form-text-input
          label="Page Title"
          placeholder="Contact List"
          v-model="pageTitle"
          :textvalue="pageTitle"
        />
      </div>
      <div class="col-md-3">
        <form-text-input
          label="Capability"
          placeholder="manage_options"
          v-model="capability"
          :textvalue="capability"
        />
      </div>
      <div class="col-md-3">
        <form-text-input
          label="Page Slug"
          placeholder="address-book"
          v-model="pageSlug"
          :textvalue="pageSlug"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormTextInput from "../../../Common/FormTextInput";
import { mapGetters } from "vuex";
import { slug, titleCase } from "@/utils/helpers";
import { CodeBase } from "@/codebase/index";
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  components: {
    FormTextInput,
  },
  computed: {
    ...mapGetters(["tables"]),
    adminPanel: {
      get() {
        return this.getSettingsData("adminPanel");
      },
      set(val) {
        if (!val) {
          this.$store
            .dispatch("addNewFileInFileTree", {
              id: "includes_crud_admin_file_" + this.index,
              replace: true,
              setFileArchitecture: false,
            })
            .then((res) => {
              //delete list table php file
              this.$store.dispatch("addNewFileInFileTree", {
                id: "includes_crud_admin_list_file_" + this.index,
                replace: true,
                setFileArchitecture: false,
              });

              this.$store.dispatch("deleteCrudViewFile", {
                index: this.index,
              });
            });

          this.$store.dispatch("setFileArchitecture", true);

          this.$store.dispatch("setTableData", {
            index: this.index,
            key: "settings",
            value: {},
          });
        }

        this.setSettingsData("adminPanel", val);
      },
    },
    crudClassName: {
      get() {
        return this.getSettingsData("crudClassName");
      },
      set(val) {
        val = titleCase(val, "_").trim();
        this.setSettingsData("crudClassName", val);

        //add crud php file for handle for input and plugin pgae
        this.$store
          .dispatch("addNewFileInFileTree", {
            id: "includes_crud_admin_file_" + this.index,
            type: "php",
            file: true,
            name: val + ".php",
            parent_id: "includes_admin",
            replace: true,
            value: () => {
              return CodeBase.dynamicMenuPageHandler(
                this.$store.getters.general,
                this.$store.getters.tables[this.index]
              );
            },
          })
          .then((response) => {
            //add list table php file
            this.$store.dispatch("addNewFileInFileTree", {
              id: "includes_crud_admin_list_file_" + this.index,
              type: "php",
              file: true,
              name: val + "_List.php",
              parent_id: "includes_admin",
              replace: true,
              value: () => {
                return CodeBase.listTableCode(
                  val + "_List",
                  this.$store.getters.general,
                  this.$store.getters.tables[this.index]
                );
              },
            });
          });
      },
    },
    menuTitle: {
      get() {
        return this.getSettingsData("menuTitle");
      },
      set(val) {
        this.setSettingsData("menuTitle", val);
      },
    },
    pageTitle: {
      get() {
        return this.getSettingsData("pageTitle");
      },
      set(val) {
        this.setSettingsData("pageTitle", val);
      },
    },
    capability: {
      get() {
        return this.getSettingsData("capability");
      },
      set(val) {
        val = slug(val, "_");
        this.setSettingsData("capability", val);
      },
    },
    fileNamePrefix: {
      get() {
        return this.getSettingsData("fileNamePrefix");
      },
      set(val) {
        val = slug(val, "-");
        this.setSettingsData("fileNamePrefix", val);

        this.addViewFile(val, "new");
        this.addViewFile(val, "edit");
        // this.addViewFile(val, "view");
        this.addViewFile(val, "list");
      },
    },
    nonceKey: {
      get() {
        return this.getSettingsData("nonceKey");
      },
      set(val) {
        val = slug(val, "-");
        this.setSettingsData("nonceKey", val);
      },
    },
    submitButtonText: {
      get() {
        return this.getSettingsData("submitButtonText");
      },
      set(val) {
        this.setSettingsData("submitButtonText", val);
      },
    },
    updateButtonText: {
      get() {
        return this.getSettingsData("updateButtonText");
      },
      set(val) {
        this.setSettingsData("updateButtonText", val);
      },
    },
    submitName: {
      get() {
        return this.getSettingsData("submitName");
      },
      set(val) {
        val = slug(val, "_");
        this.setSettingsData("submitName", val);
      },
    },
    singularName: {
      get() {
        return this.getSettingsData("singularName");
      },
      set(val) {
        val = slug(val, "_");
        this.setSettingsData("singularName", val);
      },
    },
    pluralName: {
      get() {
        return this.getSettingsData("pluralName");
      },
      set(val) {
        val = slug(val, "_");
        this.setSettingsData("pluralName", val);
      },
    },
    noItemFoundText: {
      get() {
        return this.getSettingsData("noItemFoundText");
      },
      set(val) {
        this.setSettingsData("noItemFoundText", val);
      },
    },
    perPage: {
      get() {
        return this.getSettingsData("perPage");
      },
      set(val) {
        this.setSettingsData("perPage", val);
      },
    },
    pageSlug: {
      get() {
        return this.getSettingsData("pageSlug");
      },
      set(val) {
        val = slug(val, "-");
        this.setSettingsData("pageSlug", val);
      },
    },
  },
  methods: {
    getSettingsData(key) {
      return this.tables[this.index].settings[key];
    },
    setSettingsData(key, value) {
      if (typeof value === "string") {
        value = value.trim();
      }

      this.$store.dispatch("setTableData", {
        index: this.index,
        key: "settings",
        value: {
          ...this.tables[this.index].settings,
          [key]: value,
        },
      });
    },
    addViewFile(fileNamePrefix, viewType) {
      this.$store.dispatch("addNewFileInFileTree", {
        id: `includes_crud_admin_view_file_${viewType}_${this.index}`,
        type: "php",
        file: true,
        name: `${fileNamePrefix}-${viewType}.php`,
        parent_id: "includes_admin_views",
        replace: true,
        value: () => {
          return CodeBase.adminViewCode(
            viewType,
            this.$store.getters.general,
            this.$store.getters.tables[this.index]
          );
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
