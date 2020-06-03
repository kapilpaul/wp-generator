import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { slug } from "./utils/helpers";
import VueClipboards from "vue-clipboards";
Vue.use(VueClipboards);

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

require("./assets/css/main.css");
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
    strRandom(length = 10) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;

      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },
  filters: {
    slug(value, separator = "-") {
      return slug(value, separator);
    },
  },
  render: (h) => h(App),
}).$mount("#app");
