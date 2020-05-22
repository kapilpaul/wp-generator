<template>
  <div class="hello">
    <h2>vue-code-highlight example</h2>
    <FormInputs></FormInputs>
    <div class="">
      <div>
        <pre
          class="language-php"
        ><code ref="codeblocksdata" v-html="baseNamespace"></code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import "./prism";
import FormInputs from "./FormInputs/index";
import { mapGetters } from "vuex";

export default {
  name: "HelloWorld",
  data() {
    return {
      componentKey: 0,
      show: false,
    };
  },
  computed: {
    ...mapGetters(["baseNamespace"]),
    baseNamespace() {
      let baseNamespace = this.$store.getters.baseNamespace;
      return textPhpCode.data
        .replace(/{{baseNamespace}}/g, baseNamespace)
        .trim();
    },
  },
  watch: {
    text(newValue, oldValue) {
      // setTimeout(() => {
      //   this.$emit("getCodeData", this.$refs.codeblocksdata.textContent);
      // }, 200);
    },
  },
  components: {
    FormInputs,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

<style>
body {
  margin: 0;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
