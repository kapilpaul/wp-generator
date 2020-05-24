<template>
  <div class="form-group">
    <label for="name">{{ label }}</label>
    <input
      type="text"
      :name="name !== '' ? name : this.strRandom()"
      :id="name !== '' ? name : this.strRandom()"
      :class="className"
      :placeholder="placeholder"
      :value="textvalue"
      @input="$emit('input', $event.target.value)"
      :disabled="disabled"
      autocomplete="off"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    textvalue: {
      type: [String, Number],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "form-control",
    },
  },
  data() {
    return {
      inputData: "",
    };
  },
  methods: {
    strRandom() {
      return this.$root.strRandom();
    },
  },
};
</script>

<style lang="scss" scoped></style>
