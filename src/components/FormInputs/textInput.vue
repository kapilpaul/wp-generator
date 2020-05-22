<template>
  <div :class="`col-md-${col}`">
    <div class="form-group">
      <label for="name">{{ label }}</label>
      <input type="text" v-model="inputData" autocomplete="off" />
    </div>
  </div>
</template>

<script>
import { slug, titleCase } from "../../utils/helpers";

export default {
  props: {
    col: {
      type: Number,
      default: 6,
    },
    label: {
      type: String,
      default: "",
    },
    objkey: {
      type: String,
      default: "",
    },
    convertCase: {
      type: String,
      default: "",
    },
    separator: {
      type: String,
      default: "",
    },
  },
  computed: {
    inputData: {
      get() {
        return this.$store.getters.general[this.objkey];
      },
      set(val) {
        if (this.objkey !== "") {
          if (this.convertCase === "slug") {
            val = slug(val, this.separator);
          }

          if (this.convertCase === "title") {
            val = titleCase(val, this.separator);
          }

          if (this.convertCase === "uppercase") {
            val = titleCase(val, this.separator).toUpperCase();
          }

          this.$store.dispatch("setGeneralData", {
            key: this.objkey,
            value: val,
          });
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
