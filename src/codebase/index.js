import { validateFields } from "./fields";
import { mainPluginCode } from "./main-plugin";
import { assetsCode } from "./assets";
import { composerCode } from "./composer";
import { installerCode } from "./installer";
import { wpCrudFunctions } from "./curd-php-snippet";
import { dynamicMenuPageHandler } from "./dynamic-menu-page-handler";
import { adminCode } from "./admin-snippet";

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
  adminCode: (data) => {
    return adminCode(validateFields(data));
  },
};
