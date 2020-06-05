<template>
  <div class="home">
    <section class="center padding">
      <div class="margin-bottom max-width-m">
        <h3>WP GENERATOR</h3>
        <p class="lead">
          Build awesome plugin starter with a structure.
        </p>
      </div>

      <div class="container-fluid p-0">
        <div class="row no-gutter">
          <div class="col-md-8">
            <div class="form-wpgen text-left">
              <form-inputs />
            </div>
          </div>
          <div class="col-md-4">
            <generated-files-tree />

            <button
              class="btn btn-primary btn-block mt-5"
              @click.prevent="makeZip"
              v-if="$store.state.general.pluginName !== ''"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import JSZip from "jszip";
import { saveAs } from "file-saver";
import FormInputs from "@/components/FormInputs";
import GeneratedFilesTree from "@/components/GeneratedFilesTree";
import { buildZipTree } from "../utils/buildtree";
import { slug } from "../utils/helpers";
export default {
  name: "Home",
  data() {
    return {
      check: "",
    };
  },
  components: {
    FormInputs,
    GeneratedFilesTree,
  },
  methods: {
    async makeZip() {
      var zip = new JSZip();
      let zipname = slug(this.$store.getters.pluginName);
      let tree = this.$store.getters.filesTree;
      await buildZipTree(tree, zip);

      zip.generateAsync({ type: "blob" }).then(
        function(blob) {
          // 1) generate the zip file
          saveAs(blob, `${zipname}.zip`); // 2) trigger the download
        },
        function(err) {}
      );
    },
  },
};
</script>

<style>
/* Images */
.bg-image-01:after {
  background: url("../assets/media/bg/image-01@2x.jpg");
}
</style>
