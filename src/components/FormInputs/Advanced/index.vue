<template>
  <div>
    <card sectionName="Advanced">
      <div class="row">
        <!-- Main Class Name -->
        <text-input
          label="Base Namespace"
          objkey="baseNamespace"
          convert-case="title"
        />

        <!-- Main Class Name -->
        <text-input
          label="Main Class Name"
          objkey="mainClassName"
          convert-case="title"
        />

        <!-- Constant Prefix -->
        <text-input
          label="Constant Prefix"
          objkey="constantPrefix"
          convert-case="uppercase"
        />

        <!-- Constant Prefix -->
        <text-input
          label="Function Prefix"
          objkey="functionPrefix"
          convert-case="slug"
          separator="_"
          placeholder="wp_gen"
        />
      </div>
    </card>
  </div>
</template>

<script>
import textInput from "../textInput";
import card from "../card";
export default {
  components: {
    textInput,
    card,
  },
};
</script>

<style lang="scss" scoped></style>
