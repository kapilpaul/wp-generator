<template>
  <div class="row">
    <div class="col-md-3">
      <form-text-input label="Field Name" v-model="name" :textvalue="name" />
    </div>

    <div class="col-md-2">
      <div class="form-group">
        <label for="country">Type</label>
        <div class="select-wrapper">
          <select id="type" name="type" v-model="type">
            <option value="INT">INT</option>
            <option value="FLOAT">FLOAT</option>
            <option value="VARCHAR">VARCHAR</option>
            <option value="TEXT">TEXT</option>
            <option value="DATE">DATE</option>
            <option value="DATETIME">DATETIME</option>
            <option value="TIMESTAMP">TIMESTAMP</option>
          </select>
        </div>
      </div>
    </div>

    <div class="col-md-2">
      <form-text-input label="Length" v-model="length" :textvalue="length" />
    </div>

    <div class="col-md-1">
      <div class="form-group">
        <label>Nullable</label>
        <input :id="id" type="checkbox" v-model="nullable" />
        <label :for="id" class="checkbox"></label>
      </div>
    </div>

    <div class="col-md-1">
      <div class="form-group">
        <label>Primary Key</label>
        <input :id="primaryKeyId" type="checkbox" v-model="primary_key" />
        <label :for="primaryKeyId" class="checkbox"></label>
      </div>
    </div>

    <div class="col-md-2">
      <form-text-input
        label="Default"
        v-model="defaultValue"
        :textvalue="defaultValue"
      />
    </div>

    <div class="col-md-1">
      <div class="form-group">
        <button
          class="button btn-danger button-s del-btn"
          role="button"
          @click.prevent="delField"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FormTextInput from "../../../Common/FormTextInput";
import { mapGetters } from "vuex";
import { slug } from "../../../../utils/helpers";
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    fieldIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      id: this.$root.strRandom(),
      primaryKeyId: this.$root.strRandom(),
    };
  },
  components: {
    FormTextInput,
  },
  computed: {
    ...mapGetters(["tables"]),
    name: {
      get() {
        return this.getData("name");
      },
      set(val) {
        this.setData("name", val);
      },
    },
    type: {
      get() {
        return this.getData("type");
      },
      set(val) {
        this.setData("type", val, false);
      },
    },
    length: {
      get() {
        return this.getData("length");
      },
      set(val) {
        this.setData("length", val);
      },
    },
    nullable: {
      get() {
        return this.getData("nullable");
      },
      set(val) {
        this.setData("nullable", val, false);
      },
    },
    primary_key: {
      get() {
        return this.getData("primary_key");
      },
      set(val) {
        this.setData("primary_key", val, false);
      },
    },
    defaultValue: {
      get() {
        return this.getData("default");
      },
      set(val) {
        this.setData("default", val);
      },
    },
  },
  methods: {
    getData(key) {
      return this.tables[this.index].fields[this.fieldIndex][key];
    },
    setData(key, value, slugCase = true) {
      value = slugCase ? slug(value, "_") : value;

      this.$store.dispatch("setTableFieldData", {
        index: this.index,
        fieldIndex: this.fieldIndex,
        key: key,
        value: value,
      });
    },
    delField() {
      this.$store.dispatch("deleteTableField", {
        index: this.index,
        fieldIndex: this.fieldIndex,
      });
    },
  },
};
</script>

<style scoped>
.form-wpgen input[type="email"],
.form-wpgen input[type="password"],
.form-wpgen input[type="text"],
.form-wpgen select,
.form-wpgen .select-wrapper {
  line-height: 14px;
}
</style>

<style>
.del-btn {
  margin-top: 30px;
}
</style>
