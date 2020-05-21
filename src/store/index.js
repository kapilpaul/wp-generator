import Vue from "vue";
import Vuex from "vuex";
import { slug } from "../utils/helpers";
import { buildTreeData } from "../utils/buildtree";
import { textPhpCode } from "../components/text";

Vue.use(Vuex);

const store = {
  state: {
    fileArchitecture: [],
    filesTree: [
      {
        id: "root",
        type: "pluginName",
        directory: true,
        name: "plugin_name",
        parent_id: null,
      },
      {
        id: "root_assets",
        type: "assets_dir",
        directory: true,
        name: "assets",
        parent_id: "root",
      },
      {
        id: "assets_css",
        type: "css_dir",
        directory: true,
        name: "css",
        parent_id: "root_assets",
      },
      {
        id: "assets_js",
        type: "js_dir",
        directory: true,
        name: "js",
        parent_id: "root_assets",
      },
      {
        id: "assets_images",
        type: "images_dir",
        directory: true,
        name: "images",
        parent_id: "root_assets",
      },
      // {
      //   id: "assets_images_file",
      //   type: "image",
      //   file: true,
      //   name: "images.jpg",
      //   parent_id: "assets_images",
      // },
      // {
      //   id: "assets_images_file",
      //   type: "image",
      //   file: true,
      //   name: "images1.jpg",
      //   parent_id: "assets_images",
      // },
      {
        id: "root_includes",
        type: "includes_dir",
        directory: true,
        name: "includes",
        parent_id: "root",
      },
      {
        id: "includes_admin",
        type: "admin_dir",
        directory: true,
        name: "Admin",
        parent_id: "root_includes",
      },
      {
        id: "includes_admin_file",
        type: "php",
        file: true,
        name: "Menu.php",
        parent_id: "includes_admin",
      },
      {
        id: "includes_api",
        type: "api_dir",
        directory: true,
        name: "Api",
        parent_id: "root_includes",
      },
      {
        id: "api_file",
        type: "php",
        file: true,
        name: "Example.php",
        parent_id: "includes_api",
      },
      {
        id: "includes_frontend",
        type: "frontend_dir",
        directory: true,
        name: "Frontend",
        parent_id: "root_includes",
      },
      {
        id: "frontend_file",
        type: "php",
        file: true,
        name: "Shortcode.php",
        parent_id: "includes_frontend",
      },
      {
        id: "includes_file",
        type: "php",
        file: true,
        name: "Admin.php",
        parent_id: "root_includes",
      },
      {
        id: "includes_file",
        type: "php",
        file: true,
        name: "Api.php",
        parent_id: "root_includes",
      },
      {
        id: "includes_file",
        type: "php",
        file: true,
        name: "Assets.php",
        parent_id: "root_includes",
      },
      {
        id: "includes_file",
        type: "php",
        file: true,
        name: "Frontend.php",
        parent_id: "root_includes",
      },
      {
        id: "includes_file",
        type: "php",
        file: true,
        name: "Installer.php",
        parent_id: "root_includes",
      },
      {
        id: "root_language",
        type: "lang-dir",
        directory: true,
        name: "languages",
        parent_id: "root",
      },
      {
        id: "root_composer",
        type: "composer",
        file: true,
        name: "composer.json",
        parent_id: "root",
      },
      {
        id: "root_index",
        type: "php",
        file: true,
        name: "index.php",
        parent_id: "root",
        value: () => {
          return `<?php //silence is golden`;
        },
      },
      {
        id: "root_main_plugin_file",
        type: "main-plugin-php-file",
        file: true,
        name: "plugin.php",
        parent_id: "root",
        value: () => {
          return textPhpCode(store.state.general.pluginName);
        },
      },
      {
        id: "root_readme_md",
        type: "readme",
        file: true,
        name: "README.md",
        parent_id: "root",
      },
      {
        id: "root_readme_txt",
        type: "readme",
        file: true,
        name: "readme.txt",
        parent_id: "root",
      },
    ],
    general: {
      pluginName: "",
      baseNamespace: "",
    },
    activeFileCodes: "",
  },
  getters: {
    filesTree: (state) => state.filesTree,
    pluginName: (state) => state.general.pluginName,
    baseNamespace: (state) => state.general.baseNamespace,
    activeFileCodes: (state) => state.activeFileCodes,
  },
  mutations: {
    setPluginName(state, payload) {
      state.fileArchitecture[0].text = payload;
      state.filesTree[0].name = payload;
      state.general.pluginName = payload;

      state.filesTree.map((item) => {
        if (item.type === "main-plugin-php-file") {
          item.name = `${payload}.php`;
        }
      });
    },
    setBaseNamespace(state, payload) {
      state.general.baseNamespace = payload.replace(/\s/g, "_");
    },
    setFileArchitecture(state, payload) {
      state.fileArchitecture = payload;
    },
    setActiveFileCodes(state, payload) {
      state.activeFileCodes = payload;
    },
  },
  actions: {
    setPluginName({ commit, dispatch }, payload) {
      commit("setPluginName", slug(payload));
      dispatch("setFileArchitecture", true);
    },
    setBaseNamespace({ commit }, payload) {
      commit("setBaseNamespace", payload);
    },
    setActiveFileCodes({ commit }, payload) {
      commit("setActiveFileCodes", payload);
    },
    setFileArchitecture({ state, commit }, payload) {
      if (payload) {
        let tree = buildTreeData(state.filesTree);
        commit("setFileArchitecture", tree);
      }
    },
  },
  modules: {},
};

export default new Vuex.Store(store);
