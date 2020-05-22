import { validateFields } from "./fields";
import { mainPluginCode } from "./main-plugin";

export const CodeBase = {
  mainPluginCode: (data) => {
    return mainPluginCode(validateFields(data));
  },
};
