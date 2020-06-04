<template>
  <div>
    <button class="btn btn-outline-primary mb-2 btn-sm" @click="downloadFile">
      Download File
    </button>

    <button
      class="btn btn-outline-primary float-right mb-2 btn-sm"
      :class="{ copied: copy }"
      v-clipboard="activeCode"
      @success="handleSuccess"
      @error="handleError"
    >
      {{ copyText }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copy: false,
      copyText: "Copy To Clipboard",
    };
  },
  computed: {
    activeCode() {
      return this.$store.getters.activeFileCodes;
    },
  },
  methods: {
    handleSuccess(e) {
      this.copy = true;
      this.copyText = "Copied to clipboard";

      setTimeout(() => {
        this.copyText = "Copy To Clipboard";
        this.copy = false;
      }, 1000);
    },
    handleError(e) {},
    downloadFile() {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(this.$store.getters.activeFileCodes)
      );
      element.setAttribute("download", this.$store.getters.activeFileName);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
  },
};
</script>

<style scoped>
.copied {
  background: #76ff03;
  color: #fff;
  border: 1px solid #76ff03;
}

.copied:hover {
  background-color: #76ff03;
  border-color: #76ff03;
}
</style>
