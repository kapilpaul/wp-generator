import { validateFields } from "./fields";
import { mainPluginCode } from "./main-plugin";
import { assetsCode } from "./assets";
import { composerCode } from "./composer";
import { installerCode } from "./installer";

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
  installerCode: (data) => {
    return installerCode(validateFields(data));
  },
};
