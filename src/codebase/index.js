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
import { gitIgnoreCode } from "./gitignore-snippet";
import { editorconfigCode } from "./editorconfig-snippet";
import { phpcsCode } from "./phpcs-snippet";
import { eslintignoreCode } from "./eslintignore-snippet";
import { eslintrcCode } from "./eslintrc-snippet";
import { prettierrcCode } from "./prettierrc-snippet";
import { readmeCode } from "./readme-snippet";

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
  restapiCode: (data, restApiData, settings, singleRestApi = false) => {
    settings = singleRestApi ? settings : validateTableSetting(settings);

    return restapiSnippet(
      validateFields(data),
      validateRestApiSetting(restApiData),
      settings,
      singleRestApi
    );
  },
  apiCode: (data, restapis) => {
    return apiSnippetCode(validateFields(data), restapis);
  },
  frontendShortcode: (data) => {
    return shortcodeSnippet(validateFields(data));
  },
  frontendCode: (data) => {
    return frontendSnippet(validateFields(data));
  },
  menuCode: (data, tables, mainMenu) => {
    return menuSnippet(validateFields(data), tables, mainMenu);
  },
  formErrorCode: (data) => {
    return formErrorSnippet(validateFields(data));
  },
  gitIgnoreCode: () => {
    return gitIgnoreCode();
  },
  editorconfigCode: () => {
    return editorconfigCode();
  },
  phpcsCode: () => {
    return phpcsCode();
  },
  eslintignoreCode: () => {
    return eslintignoreCode();
  },
  eslintrcCode: () => {
    return eslintrcCode();
  },
  prettierrcCode: () => {
    return prettierrcCode();
  },
  readmeCode: (data) => {
    return readmeCode(validateFields(data));
  },
};
