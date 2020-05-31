<template>
  <div>
    <card sectionName="Advanced">
      <div class="row">
        <!-- Main Class Name -->
        <text-input
          label="Base Namespace"
          objkey="baseNamespace"
          convert-case="title"
          helptext="Plugin initial namespace. ex: WPGenerator\Weather"
          placeholder="WPGenerator\Weather"
        />

        <!-- Main Class Name -->
        <text-input
          label="Main Class Name"
          objkey="mainClassName"
          convert-case="title"
          helptext="Plugin initial class name. ex: Weather_Forecast"
          placeholder="Weather_Forecast"
        />

        <!-- Constant Prefix -->
        <text-input
          label="Constant Prefix"
          objkey="constantPrefix"
          convert-case="uppercase"
          helptext="Plugin constant prefix. ex: WEATHER_ASSETS"
          placeholder="WEATHER_ASSETS"
        />

        <!-- Constant Prefix -->
        <text-input
          label="Function Prefix"
          objkey="functionPrefix"
          convert-case="slug"
          separator="_"
          helptext="Plugin function prefix. ex: wf_get_results"
          placeholder="wf_get_results"
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
