import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { slug } from "./utils/helpers";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

require("./assets/js/main.js");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  methods: {
    addBodyClass(class_name = "") {
      let addClasses =
        class_name === "" ? "page preload" : "page " + class_name + " preload";
      let body = document.querySelector("body");
      body.className += " " + addClasses;
    },
  },
  filters: {
    slug(value, separator = "-") {
      return slug(value, separator);
    },
  },
  render: (h) => h(App),
}).$mount("#app");
