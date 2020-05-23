<template>
  <div>
    <card sectionName="JS Files">
      <div v-for="(item, index) in assets.js" :key="index">
        <script-input :index="index" type="js" :col="3"></script-input>
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
      this.$store.dispatch("addNewAssets", { type: "js" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
