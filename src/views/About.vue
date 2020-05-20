<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div>
      <hello-world />
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  components: {
    HelloWorld,
  },
};
</script>
