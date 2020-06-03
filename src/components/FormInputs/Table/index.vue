<template>
  <div>
    <card sectionName="Table">
      <div v-for="(item, index) in tables" :key="index" class="mb-20">
        <table-input :index="index" />
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
import TableInput from "./table-input";
import { mapGetters } from "vuex";

export default {
  components: {
    textInput,
    card,
    TableInput,
  },
  computed: {
    ...mapGetters(["tables"]),
  },
  methods: {
    addnew() {
      this.$store.dispatch("addNewTable", true);
      this.$store.dispatch("addNewRestApi", true);
    },
  },
};
</script>

<style lang="scss" scoped></style>
