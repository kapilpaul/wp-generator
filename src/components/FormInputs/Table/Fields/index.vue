<template>
  <div>
    <div
      v-for="(item, i) in tableFields"
      :key="i"
      class="pt-10 mb-10 field_area"
    >
      <fields :index="index" :field-index="i" />
    </div>

    <button
      class="button button-primary button-s"
      role="button"
      @click.prevent="addnew"
    >
      Add Field
    </button>
  </div>
</template>

<script>
import fields from "./fields";
import { mapGetters } from "vuex";

export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  components: {
    fields,
  },
  computed: {
    ...mapGetters(["tables"]),
    tableFields() {
      return this.tables[this.index].fields;
    },
  },
  methods: {
    addnew() {
      this.$store.dispatch("addNewTableField", { index: this.index });
    },
  },
};
</script>

<style scoped>
.field_area {
  border-top: 1px solid #ddd;
}
div.field_area:first-child {
  padding-top: 0 !important;
  border-top: 0px solid #ddd;
}
</style>
