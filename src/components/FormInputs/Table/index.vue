<template>
  <div>
    <card sectionName="Table">
      <div v-for="(item, index) in tables" :key="index" class="mb-20">
        <settings :index="index" />
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
import textInput from "../textInput";
import card from "../card";
import Settings from "./settings";
import { mapGetters } from "vuex";

export default {
  components: {
    textInput,
    card,
    Settings,
  },
  computed: {
    ...mapGetters(["tables"]),
  },
  methods: {
    addnew() {
      this.$store.dispatch("addNewTable", true);
    },
  },
};
</script>

<style lang="scss" scoped></style>
