<template>
  <div>
    <card sectionName="General">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="name">Plugin Name</label>
            <input
              type="text"
              name="name"
              autocomplete="off"
              v-model="pluginName"
            />
          </div>
        </div>

        <!-- Plugin URI -->
        <text-input label="Plugin URI" objkey="pluginURI" />

        <!-- Description -->
        <text-input label="Description" objkey="description" :col="12" />

        <!-- Version -->
        <text-input label="Version" objkey="version" />

        <!-- Author -->
        <text-input label="Author" objkey="author" />

        <!-- Author URI -->
        <text-input label="Author URI" objkey="authorURI" />

        <!-- Author Email -->
        <text-input label="Author Email" objkey="authorEmail" />

        <!-- License -->
        <text-input label="License" objkey="license" />

        <!-- license URI -->
        <text-input label="License URI" objkey="licenseURI" />

        <!-- textdomain -->
        <text-input
          label="Text Domain"
          objkey="textDomain"
          convert-case="slug"
        />

        <!-- Domain Path -->
        <text-input label="Domain Path" objkey="domainPath" />
      </div>
    </card>
  </div>
</template>

<script>
import textInput from "../textInput";
import card from "../card";
export default {
  name: "General",
  computed: {
    pluginName: {
      get() {
        return this.$store.getters.pluginName;
      },
      set(val) {
        this.$store.dispatch("setPluginName", val);
      },
    },
  },
  components: {
    textInput,
    card,
  },
};
</script>

<style lang="scss" scoped></style>
