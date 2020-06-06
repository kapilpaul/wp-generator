<template>
  <div class="row no-gutter">
    <div :class="`col-md-${col}`">
      <div class="form-group">
        <label for="name">Handle</label>
        <input type="text" v-model="handle" autocomplete="off" />
      </div>
    </div>
    <div :class="`col-md-${col}`">
      <div class="form-group">
        <label for="name">File Name</label>
        <input type="text" v-model="filename" autocomplete="off" />
      </div>
    </div>

    <div class="col-md-4">
      <div class="form-group">
        <label for="name">Dependency</label>
        <input type="text" v-model="dependency" autocomplete="off" />
      </div>
    </div>

    <div class="col-md-2" v-if="type === 'js'">
      <div class="form-group">
        <label>In Footer</label>
        <input
          :id="`in_footer-${index}`"
          class="switch"
          type="checkbox"
          v-model="in_footer"
        />
        <label :for="`in_footer-${index}`" class="switch"></label>
      </div>
    </div>
  </div>
</template>

<script>
import { slug, titleCase } from "../../../utils/helpers";
import { mapState } from "vuex";

export default {
  props: {
    col: {
      type: Number,
      default: 6,
    },
    index: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "css",
    },
  },
  computed: {
    ...mapState(["assets"]),
    handle: {
      get() {
        return this.assets[this.type][this.index].handle;
      },
      set(val) {
        if (val !== "") {
          this.$store.dispatch("setAssetsData", {
            type: this.type,
            index: this.index,
            key: "handle",
            value: slug(val),
          });
        }
      },
    },
    filename: {
      get() {
        let key = this.type === "css" ? "style" : "script";
        let filename = this.assets[this.type][this.index][key];

        return filename;
      },
      set(val) {
        if (val !== "") {
          this.addFile(val);
        }
      },
    },
    dependency: {
      get() {
        let key = "dependency";
        return this.assets[this.type][this.index][key];
      },
      set(val) {
        this.$store.dispatch("setAssetsData", {
          type: this.type,
          index: this.index,
          key: "dependency",
          value: val,
        });
      },
    },
    in_footer: {
      get() {
        let key = "in_footer";
        return this.assets[this.type][this.index][key];
      },
      set(val) {
        this.$store.dispatch("setAssetsData", {
          type: this.type,
          index: this.index,
          key: "in_footer",
          value: val,
        });
      },
    },
  },
  methods: {
    addFile(val) {
      let key = this.type === "css" ? "style" : "script";

      this.$store.dispatch("setAssetsData", {
        type: this.type,
        index: this.index,
        key: key,
        value: slug(val),
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
