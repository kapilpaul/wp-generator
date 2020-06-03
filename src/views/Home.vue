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
import HelloWorld from "@/components/HelloWorld.vue";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import FormInputs from "@/components/FormInputs";
import GeneratedFilesTree from "@/components/GeneratedFilesTree";
import { buildZipTree } from "../utils/buildtree";
export default {
  name: "Home",
  data() {
    return {
      check: "",
      codeData: "",
    };
  },
  mounted() {},
  components: {
    HelloWorld,
    FormInputs,
    GeneratedFilesTree,
  },
  methods: {
    setCodeData(value) {
      console.log(value);
      this.codeData = value;
    },
    async makeZip() {
      var zip = new JSZip();
      let zipname = this.$store.getters.pluginName;
      let tree = this.$store.getters.filesTree;
      await buildZipTree(tree, zip);

      zip.generateAsync({ type: "blob" }).then(
        function(blob) {
          // 1) generate the zip file
          saveAs(blob, `${zipname}.zip`); // 2) trigger the download
        },
        function(err) {
          console.log(err);
        }
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
