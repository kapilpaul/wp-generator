<template>
  <div>
    <section class="center padding">
      <div class="margin-bottom max-width-m">
        <h3>WP REST API GENERATOR</h3>
        <p class="lead">
          Build RestApi with a structure.
        </p>
      </div>

      <div class="container-fluid p-0">
        <div class="row no-gutter">
          <div class="col-md-12">
            <div class="form-wpgen text-left">
              <rest-api-settings />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import RestApiSettings from "@/components/RestApi/index";
export default {
  components: {
    RestApiSettings,
  },
};
</script>

<style lang="scss" scoped></style>
