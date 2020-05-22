<template>
  <div>
    <card sectionName="CSS Files">
      <div class="row" v-for="(item, index) in assets.css" :key="index">
        <!-- Main Class Name -->
        <text-input label="Handle" objkey="baseNamespace" convert-case="slug" />
        <text-input
          label="FileName"
          objkey="baseNamespace"
          convert-case="slug"
        />
      </div>

      <button
        class="button button-primary button-s"
        role="button"
        @click.prevent="addnew"
      >
        ADD
      </button>
    </card>
  </div>
</template>

<script>
import Card from "../card";
import TextInput from "../textInput";
import { mapGetters } from "vuex";
export default {
  components: {
    Card,
    TextInput,
  },
  computed: {
    ...mapGetters(["assets"]),
  },
  methods: {
    addnew() {
      this.$store.dispatch("addNewAssets", { type: "css" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
