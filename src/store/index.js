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
        id: "includes_admin_views",
        type: "admin_dir",
        directory: true,
        name: "views",
        parent_id: "includes_admin",
      },
      {
        id: "includes_admin_file",
        type: "php",
        file: true,
        name: "Menu.php",
        parent_id: "includes_admin",
        value: () => {
          return CodeBase.menuCode(store.state.general, store.state.tables);
        },
      },
      {
        id: "includes_api",
        type: "api_dir",
        directory: true,
        name: "API",
        parent_id: "root_includes",
      },
      // {
      //   id: "api_file",
      //   type: "php",
      //   file: true,
      //   name: "Example.php",
      //   parent_id: "includes_api",
      // },
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
        value: () => {
          return CodeBase.frontendShortcode(store.state.general);
        },
      },
      {
        id: "includes_traits",
        type: "traits_dir",
        directory: true,
        name: "Traits",
        parent_id: "root_includes",
      },
      {
        id: "traits_file",
        type: "php",
        file: true,
        name: "Form_Error.php",
        parent_id: "includes_traits",
        value: () => {
          return CodeBase.formErrorCode(store.state.general);
        },
      },
      {
        id: "includes_file",
        type: "php",
        file: true,
        name: "Admin.php",
        parent_id: "root_includes",
        value: () => {
          return CodeBase.adminCode(store.state.general, store.state.tables);
        },
      },
      {
        id: "includes_file",
        type: "php",
        file: true,
        name: "Api.php",
        parent_id: "root_includes",
        value: () => {
          return CodeBase.apiCode(store.state.general, store.state.restapi);
        },
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
        value: () => {
          return CodeBase.frontendCode(store.state.general);
        },
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
        id: "root_gitignore",
        type: "gitignore",
        file: true,
        name: ".gitignore",
        parent_id: "root",
        value: () => {
          return CodeBase.gitIgnoreCode();
        },
      },
      {
        id: "root_editorconfig",
        type: "editorconfig",
        file: true,
        name: ".editorconfig",
        parent_id: "root",
        value: () => {
          return CodeBase.editorconfigCode();
        },
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
        value: () => {
          return CodeBase.readmeCode(store.state.general);
        },
      },
      {
        id: "root_readme_txt",
        type: "readme",
        file: true,
        name: "readme.txt",
        parent_id: "root",
        value: () => {
          return CodeBase.readmeCode(store.state.general);
        },
      },
    ],
    general: {
      pluginName: "",
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
    activeFileName: "",
    tables: [],
    restapi: [],
  },
  getters: {
    filesTree: (state) => state.filesTree,
    general: (state) => state.general,
    pluginName: (state) => state.general.pluginName,
    baseNamespace: (state) => state.general.baseNamespace,
    activeFileName: (state) => state.activeFileName,
    activeFileCodes: (state) => state.activeFileCodes,
    assets: (state) => state.assets,
    tables: (state) => state.tables,
    restapi: (state) => state.restapi,
  },
  mutations: {
    setPluginName(state, payload) {
      let name = slug(payload);
      state.fileArchitecture[0].text = name;
      state.filesTree[0].name = name;
      state.general.pluginName = payload;

      state.filesTree.map((item) => {
        if (item.type === "main-plugin-php-file") {
          item.name = `${name}.php`;
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
    setActiveFileName(state, payload) {
      state.activeFileName = payload;
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
          store.mutations.addNewFileInFileTree(store.state, {
            id: `assets_${payload.type}_file_${payload.index}`,
            type: payload.type,
            file: true,
            replace: true,
            name: payload.value,
            parent_id: "assets_" + payload.type,
            value: () => {
              return `/* wp-generator */\n/* write or paste your code here */
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
        showInCrudForm: false,
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
        state.filesTree.map((obj, index) => {
          if (obj.parent_id === payload.id) {
            Vue.delete(state.filesTree, index);
          }
        });

        state.filesTree.map((obj, index) => {
          if (obj.id === payload.id) {
            Vue.delete(state.filesTree, index);
          }
        });
      }

      if (typeof payload.name !== "undefined") {
        state.filesTree.push(payload);
      }
    },
    addNewRestApi(state, payload) {
      state.restapi.push({
        enabled: payload,
        schemaFields: [],
      });
    },
    addNewRestApiSchemaField(state, payload) {
      if (typeof payload.new !== "undefined") {
        state.restapi[payload.index].schemaFields.push({
          propertyKey: "",
          type: "",
          context: "view, edit",
          format: "",
          readonly: false,
          required: false,
          sanitize: false,
        });
      } else {
        //insert object
        state.restapi[payload.index].schemaFields.push(payload.value);
      }
    },
    setRestApiData(state, payload) {
      if (payload.type !== null && payload.type === "reset") {
        Vue.set(state.restapi, payload.index, payload.value);
      } else {
        Vue.set(state.restapi[payload.index], payload.key, payload.value);
      }
    },
    setRestApiSchemaFieldData(state, payload) {
      if (typeof payload.reset !== "undefined" && payload.reset) {
        Vue.set(state.restapi[payload.index], "schemaFields", payload.value);
      } else {
        Vue.set(
          state.restapi[payload.index].schemaFields[payload.fieldIndex],
          payload.key,
          payload.value
        );
      }
    },
    deleteRestApi(state, payload) {
      Vue.delete(state.restapi, payload.index);
    },
    deleteRestApiSchemaField(state, payload) {
      Vue.delete(state.restapi[payload.index].schemaFields, payload.fieldIndex);
    },
    setStateData(state, payload) {
      Vue.set(state, payload.key, payload.value);
    },
  },
  actions: {
    setPluginName({ commit, dispatch }, payload) {
      commit("setPluginName", payload);
      dispatch("setFileArchitecture", true);
    },
    setGeneralData({ commit, dispatch }, payload) {
      commit("setGeneralData", payload);
      saveInLocalStorage();
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
    setActiveFileName({ commit }, payload) {
      commit("setActiveFileName", payload);
    },
    setActiveFileCodes({ commit }, payload) {
      commit("setActiveFileCodes", payload);
    },
    setFileArchitecture({ state, commit }, payload) {
      if (payload) {
        let tree = buildTreeData(state.filesTree);
        commit("setFileArchitecture", tree);

        saveInLocalStorage();
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
      dispatch("setFileArchitecture", true);
    },
    addNewFileInFileTree({ commit, dispatch }, payload) {
      commit("addNewFileInFileTree", payload);

      if (typeof payload.setFileArchitecture === "undefined") {
        dispatch("setFileArchitecture", true);
      }
    },
    deleteCrudViewFile({ commit, dispatch }, payload) {
      let viewType = ["new", "edit", "view", "list"];

      viewType.map((item) => {
        dispatch("addNewFileInFileTree", {
          id: `includes_crud_admin_view_file_${item}_${payload.index}`,
          replace: true,
        });
      });
    },
    addNewRestApi({ commit, dispatch }, payload) {
      commit("addNewRestApi", payload);
    },
    addNewRestApiSchemaField({ commit, dispatch }, payload) {
      commit("addNewRestApiSchemaField", payload);
    },
    setRestApiSchemaFieldData({ commit, dispatch }, payload) {
      commit("setRestApiSchemaFieldData", payload);
    },
    deleteRestApi({ commit, dispatch }, payload) {
      commit("deleteRestApi", payload);
    },
    deleteRestApiSchemaField({ commit, dispatch }, payload) {
      commit("deleteRestApiSchemaField", payload);
    },
    setRestApiData({ commit }, payload) {
      commit("setRestApiData", payload);
    },
    setStateData({ commit, dispatch }, payload) {
      commit("setStateData", payload);
      dispatch("setFileArchitecture", true);
    },
  },
  modules: {},
};

const saveInLocalStorage = async () => {
  if (store.state.general.pluginName !== "") {
    let storeData = {
      general: store.state.general,
      assets: store.state.assets,
      tables: store.state.tables,
      restapi: store.state.restapi,
    };

    // localStorage.setItem("wpgen", JSON.stringify(storeData));
  }
};

export default new Vuex.Store(store);
