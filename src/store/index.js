import Vue from "vue";
import Vuex from "vuex";
import { slug } from "../utils/helpers";
import { buildTreeData } from "../utils/buildtree";
import { CodeBase } from "../codebase/index";

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
        value: () => {
          return CodeBase.assetsCode(store.state.general, store.state.assets);
        },
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
        value: () => {
          return CodeBase.installerCode(
            store.state.general,
            store.state.tables
          );
        },
      },
      {
        id: "includes_file",
        type: "php",
        file: true,
        name: "functions.php",
        parent_id: "root_includes",
        value: () => {
          return CodeBase.functionsCode(
            store.state.general,
            store.state.tables
          );
        },
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
        value: () => {
          return CodeBase.composerCode(store.state.general);
        },
      },
      {
        id: "root_index",
        type: "php",
        file: true,
        name: "index.php",
        parent_id: "root",
        value: () => {
          return `<?php\n//silence is golden`;
        },
      },
      {
        id: "root_main_plugin_file",
        type: "main-plugin-php-file",
        file: true,
        name: "plugin.php",
        parent_id: "root",
        value: () => {
          return CodeBase.mainPluginCode(store.state.general);
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
      pluginName: "wpgen",
      baseNamespace: "",
      pluginURI: "",
      description: "",
      version: "",
      author: "",
      authorURI: "",
      authorEmail: "",
      license: "",
      licenseURI: "",
      textDomain: "",
      domainPath: "",
      mainClassName: "",
      constantPrefix: "",
      functionPrefix: "",
    },
    assets: {
      css: [],
      js: [],
    },
    activeFileCodes: "",
    tables: [],
  },
  getters: {
    filesTree: (state) => state.filesTree,
    general: (state) => state.general,
    pluginName: (state) => state.general.pluginName,
    baseNamespace: (state) => state.general.baseNamespace,
    activeFileCodes: (state) => state.activeFileCodes,
    assets: (state) => state.assets,
    tables: (state) => state.tables,
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
    setGeneralData(state, payload) {
      state.general[payload.key] = payload.value;
    },
    setFileArchitecture(state, payload) {
      state.fileArchitecture = payload;
    },
    setActiveFileCodes(state, payload) {
      state.activeFileCodes = payload;
    },
    addNewAssets(state, payload) {
      if (payload.type === "css") {
        state.assets.css.push({
          handle: "",
          style: "",
          dependency: "",
        });
      }

      if (payload.type === "js") {
        state.assets.js.push({
          handle: "",
          script: "",
          dependency: "",
          in_footer: false,
        });
      }
    },
    setAssetsData(state, payload) {
      Vue.set(
        state.assets[payload.type][payload.index],
        payload.key,
        payload.value
      );

      //adding data to filesTree
      if (payload.key === "style" || payload.key === "script") {
        let fileExt = payload.value.split(".").pop();

        if (fileExt === payload.type) {
          state.filesTree.push({
            id: `assets_${payload.type}_file`,
            type: payload.type,
            file: true,
            name: payload.value,
            parent_id: "assets_" + payload.type,
            value: () => {
              return `/* wp2gen */\n/* write or paste your code here */
              `;
            },
          });
        }
      }
    },
    addNewTable(state, payload) {
      state.tables.push({
        name: "",
        settings: {},
        fields: [],
      });
    },
    addNewTableField(state, payload) {
      state.tables[payload.index].fields.push({
        name: "",
        type: "",
        length: 11,
        nullable: false,
        primary_key: false,
        default: "",
      });
    },
    setTableData(state, payload) {
      Vue.set(state.tables[payload.index], payload.key, payload.value);
    },
    setTableFieldData(state, payload) {
      Vue.set(
        state.tables[payload.index].fields[payload.fieldIndex],
        payload.key,
        payload.value
      );
    },
    deleteTableField(state, payload) {
      Vue.delete(state.tables[payload.index].fields, [payload.fieldIndex]);
    },
    deleteTable(state, payload) {
      Vue.delete(state.tables, [payload.index]);
    },
    addNewFileInFileTree(state, payload) {
      if (typeof payload.replace !== undefined && payload.replace) {
        state.filesTree.find((obj, index) => {
          if (obj.parent_id === payload.id) {
            Vue.delete(state.filesTree, index);
          }
        });

        state.filesTree.find((obj, index) => {
          if (obj.id === payload.id) {
            Vue.delete(state.filesTree, index);
          }
        });
      }

      if (typeof payload.name !== "undefined") {
        state.filesTree.push(payload);
      }
    },
  },
  actions: {
    setPluginName({ commit, dispatch }, payload) {
      commit("setPluginName", slug(payload));
      dispatch("setFileArchitecture", true);
    },
    setGeneralData({ commit, dispatch }, payload) {
      commit("setGeneralData", payload);
      // dispatch("setFileArchitecture", true);
    },
    addNewAssets({ commit, dispatch }, payload) {
      commit("addNewAssets", payload);
      // dispatch("setFileArchitecture", true);
    },
    setAssetsData({ commit, dispatch }, payload) {
      commit("setAssetsData", payload);
      dispatch("setFileArchitecture", true);
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
    addNewTable({ commit, dispatch }, payload) {
      commit("addNewTable", payload);
      // dispatch("setFileArchitecture", true);
    },
    addNewTableField({ commit, dispatch }, payload) {
      commit("addNewTableField", payload);
      // dispatch("setFileArchitecture", true);
    },
    setTableData({ commit, dispatch }, payload) {
      commit("setTableData", payload);
      // dispatch("setFileArchitecture", true);
    },
    setTableFieldData({ commit, dispatch }, payload) {
      commit("setTableFieldData", payload);
      // dispatch("setFileArchitecture", true);
    },
    deleteTableField({ commit, dispatch }, payload) {
      commit("deleteTableField", payload);
      // dispatch("setFileArchitecture", true);
    },
    deleteTable({ commit, dispatch }, payload) {
      commit("deleteTable", payload);
      // dispatch("setFileArchitecture", true);
    },
    addNewFileInFileTree({ commit, dispatch }, payload) {
      commit("addNewFileInFileTree", payload);
      dispatch("setFileArchitecture", true);
    },
  },
  modules: {},
};

export default new Vuex.Store(store);
