import {
  validateFields,
  validateTableSetting,
  validateRestApiSetting,
} from "./fields";
import { mainPluginCode } from "./main-plugin";
import { assetsCode } from "./assets";
import { composerCode } from "./composer";
import { installerCode } from "./installer";
import { wpCrudFunctions } from "./curd-php-snippet";
import { dynamicMenuPageHandler } from "./dynamic-menu-page-handler";
import { adminCode } from "./admin-snippet";
import { listTableCode } from "./list-table";
import { viewSnippet } from "./views/index";
import { restapiSnippet } from "./restapi-snippet";
import { apiSnippetCode } from "./api-snippet";
import { shortcodeSnippet } from "./shortcode-snippet";
import { frontendSnippet } from "./frontend-snippet";
import { menuSnippet } from "./menu-snippet";
import { formErrorSnippet } from "./form-error";

export const CodeBase = {
  mainPluginCode: (data) => {
    return mainPluginCode(validateFields(data));
  },
  assetsCode: (data, assets) => {
    return assetsCode(validateFields(data), assets);
  },
  composerCode: (data) => {
    return composerCode(validateFields(data));
  },
  installerCode: (data, tables) => {
    return installerCode(validateFields(data), tables);
  },
  functionsCode: (data, tables) => {
    return wpCrudFunctions(validateFields(data), tables);
  },
  dynamicMenuPageHandler: (data, table) => {
    return dynamicMenuPageHandler(validateFields(data), table);
  },
  adminCode: (data, tables) => {
    return adminCode(validateFields(data), tables);
  },
  listTableCode: (fileClassName, data, table) => {
    return listTableCode(fileClassName, validateFields(data), table);
  },
  adminViewCode: (viewType, data, table) => {
    return viewSnippet(viewType, validateFields(data), table);
  },
  restapiCode: (data, restApiData, settings, tableFields) => {
    return restapiSnippet(
      validateFields(data),
      validateRestApiSetting(restApiData),
      validateTableSetting(settings),
      tableFields
    );
  },
  apiCode: (data, tables) => {
    return apiSnippetCode(validateFields(data), tables);
  },
  frontendShortcode: (data) => {
    return shortcodeSnippet(validateFields(data));
  },
  frontendCode: (data) => {
    return frontendSnippet(validateFields(data));
  },
  menuCode: (data, tables) => {
    return menuSnippet(validateFields(data), tables);
  },
  formErrorCode: (data) => {
    return formErrorSnippet(validateFields(data));
  },
};
