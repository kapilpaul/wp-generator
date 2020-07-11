<template>
  <div>
    <general />

    <advanced />

    <main-menu />

    <assets />

    <tables />
  </div>
</template>

<script>
import General from "./General";
import Advanced from "./Advanced";
import MainMenu from "./MainMenu";
import Assets from "./Assets";
import Tables from "./Table";
export default {
  components: {
    General,
    Advanced,
    MainMenu,
    Assets,
    Tables,
  },
};
</script>

<style lang="scss" scoped></style>
