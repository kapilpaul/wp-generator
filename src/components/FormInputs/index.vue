<template>
  <div>
    <general />

    <advanced />

    <assets />

    <tables />
  </div>
</template>

<script>
import General from "./General";
import Advanced from "./Advanced";
import Assets from "./Assets";
import Tables from "./Table";
export default {
  components: {
    General,
    Advanced,
    Assets,
    Tables,
  },
};
</script>

<style lang="scss" scoped></style>
