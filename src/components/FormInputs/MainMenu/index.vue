<template>
  <div>
    <card sectionName="Main Menu">
      <div class="row">
        <div class="col-md-6">
          <form-text-input
            label="Menu Title"
            placeholder="Address Book"
            v-model="menuTitle"
            :textvalue="menuTitle"
          />
        </div>
        <div class="col-md-6">
          <form-text-input
            label="Page Title"
            placeholder="Contact List"
            v-model="pageTitle"
            :textvalue="pageTitle"
          />
        </div>
        <div class="col-md-6">
          <form-text-input
            label="Capability"
            placeholder="manage_options"
            v-model="capability"
            :textvalue="capability"
          />
        </div>
        <div class="col-md-6">
          <form-text-input
            label="Page Slug"
            placeholder="address-book"
            v-model="pageSlug"
            :textvalue="pageSlug"
          />
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import FormTextInput from "../../Common/FormTextInput";
import card from "../card";
import { mapGetters } from "vuex";
import { slug, titleCase } from "@/utils/helpers";

export default {
  components: {
    FormTextInput,
    card,
  },
  computed: {
    ...mapGetters(["mainMenu"]),
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
      return this.mainMenu[key];
    },
    setSettingsData(key, value) {
      if (typeof value === "string") {
        value = value.trim();
      }

      this.$store.dispatch("setMainMenuData", {
        key: key,
        value: value,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
