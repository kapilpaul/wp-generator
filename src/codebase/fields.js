import { slug } from '../utils/helpers';

/**
 * validate general data
 * @param {*} data
 */
export const validateFields = (data) => {
  let pluginData = {
    ...data,
    pluginName: data.pluginName !== "" ? data.pluginName : "wp-generator",
    baseNamespace:
      data.baseNamespace !== "" ? data.baseNamespace : "WPGenerator",
    pluginURI:
      data.pluginURI !== "" ? data.pluginURI : "https://wp-generator.com",
    description:
      data.description !== ""
        ? data.description
        : "Build awesome plugin starter with a structure.",
    version: data.version !== "" ? data.version : "0.1.0",
    author: data.author !== "" ? data.author : "Kapil Paul",
    authorURI: data.authorURI !== "" ? data.authorURI : "https://kapilpaul.me",
    authorEmail:
      data.authorEmail !== "" ? data.authorEmail : "info@kapilpaul.me",
    license: data.license !== "" ? data.license : "GPLv2",
    licenseURI:
      data.licenseURI !== ""
        ? data.licenseURI
        : "https://www.gnu.org/licenses/gpl-2.0.html",
    textDomain: data.textDomain !== "" ? data.textDomain : "wp-generator",
    domainPath: data.domainPath !== "" ? data.domainPath : "/languages",
    mainClassName: data.mainClassName !== "" ? data.mainClassName : "WPGEN",
    constantPrefix:
      data.constantPrefix !== "" ? data.constantPrefix : "WP_GENERATOR",
    functionPrefix: data.functionPrefix !== "" ? data.functionPrefix : "wp_gen",
    actionPrefix:
      data.functionPrefix !== ""
        ? data.functionPrefix.replace(/_/g, "-")
        : "wp-gen",
    pluginFileName: data.pluginName !== "" ? slug( data.pluginName ) : "wp-generator",
  };

  return pluginData;
};

/**
 * check field undefined or blank
 * @param {*} fieldName
 */
const validField = (fieldName) => {
  if (typeof fieldName === "undefined" || fieldName === "") {
    return false;
  }

  return true;
};

/**
 * validate table settings
 * @param {*} data
 */
export const validateTableSetting = (data) => {
  let settingData = {
    ...data,
    crudClassName: validField(data.crudClassName)
      ? data.crudClassName
      : "WPGenerator",
    menuTitle: validField(data.menuTitle) ? data.menuTitle : "WP Generator",
    capability: validField(data.capability)
      ? data.capability
      : "manage_options",
    fileNamePrefix: validField(data.fileNamePrefix)
      ? data.fileNamePrefix
      : "wp-generator",
    nonceKey: validField(data.nonceKey) ? data.nonceKey : "wp-generator",
    submitButtonText: validField(data.submitButtonText)
      ? data.submitButtonText
      : "Submit",
    updateButtonText: validField(data.updateButtonText)
      ? data.updateButtonText
      : "Update",
    submitName: validField(data.submitName) ? data.submitName : "submit-field",
    singularName: validField(data.singularName) ? data.singularName : "item",
    pluralName: validField(data.pluralName) ? data.pluralName : "items",
    noItemFoundText: validField(data.noItemFoundText)
      ? data.noItemFoundText
      : "Not found any item",
    perPage: validField(data.perPage) ? data.perPage : "20",
    pageSlug: validField(data.pageSlug) ? data.pageSlug : "wp-generator",
  };

  return settingData;
};

/**
 * validate table settings
 * @param {*} data
 */
export const validateRestApiSetting = (data) => {
  let settingData = {
    ...data,
    className: validField(data.className) ? data.className : "Example",
    namespace: validField(data.namespace) ? data.namespace : "wpgenerator/v1",
    restbase: validField(data.restbase) ? data.restbase : "items",
  };

  return settingData;
};
