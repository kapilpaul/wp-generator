<template>
  <div>
    <card sectionName="CSS Files">
      <div v-for="(item, index) in assets.css" :key="index">
        <script-input :index="index" :col="4"></script-input>
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
import ScriptInput from "./scriptInput";
import { mapGetters } from "vuex";
export default {
  components: {
    Card,
    TextInput,
    ScriptInput,
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
