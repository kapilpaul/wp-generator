<template>
  <div>
    <div class="card">
      <div class="card-header">
        General
      </div>

      <div class="card-body">
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
          <div class="col-md-6">
            <div class="form-group">
              <label for="name">Base Namespace</label>
              <input
                type="text"
                name="name"
                v-model="baseNamespace"
                autocomplete="off"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "General",
  computed: {
    baseNamespace: {
      get() {},
      set(val) {
        this.$store.dispatch("setBaseNamespace", val);
      },
    },
    pluginName: {
      get() {},
      set(val) {
        this.$store.dispatch("setPluginName", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
