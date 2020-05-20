<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ $store.getters.pluginName }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-left">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <v-jstree
                    :data="$store.state.fileArchitecture"
                    v-if="$store.state.general.pluginName !== ''"
                  ></v-jstree>
                </div>
                <div class="col-md-9">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  vel dolore necessitatibus nulla. Minus labore totam, molestiae
                  tempora expedita sequi veniam aut libero ut, inventore quae
                  natus deleniti aliquid ratione?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VJstree from "vue-jstree";
export default {
  components: {
    VJstree,
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  .modal-lg,
  .modal-xl {
    max-width: 1350px;
  }
}
</style>
