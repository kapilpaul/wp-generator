import { validateFields } from "./fields";
import { mainPluginCode } from "./main-plugin";
import { assetsCode } from "./assets";

export const CodeBase = {
  mainPluginCode: (data) => {
    return mainPluginCode(validateFields(data));
  },
  assetsCode: (data, assets) => {
    return assetsCode(validateFields(data), assets);
  },
};
