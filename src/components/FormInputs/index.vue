<template>
  <div>
    <general />

    <advanced />

    <assets />
  </div>
</template>

<script>
import General from "./General";
import Advanced from "./Advanced";
import Assets from "./Assets";
export default {
  components: {
    General,
    Advanced,
    Assets,
  },
};
</script>

<style lang="scss" scoped></style>
