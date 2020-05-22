export const validateFields = (data) => {
  let pluginData = {
    ...data,
    pluginName: data.pluginName !== "" ? data.pluginName : "wp2gen",
    baseNamespace: data.baseNamespace !== "" ? data.baseNamespace : "WP2GEN",
    pluginURI: data.pluginURI !== "" ? data.pluginURI : "https://wp2gen.com",
    description:
      data.description !== ""
        ? data.pluginURI
        : "Build awesome plugin starter with a structure.",
    version: data.version !== "" ? data.version : "0.1.0",
    author: data.author !== "" ? data.author : "Kapil Paul",
    authorURI: data.authorURI !== "" ? data.authorURI : "https://kapilpaul.me",
    authorEmail:
      data.authorEmail !== "" ? data.authorEmail : "kapil@wp2gen.com",
    license: data.license !== "" ? data.license : "GPLv2",
    licenseURI:
      data.licenseURI !== ""
        ? data.licenseURI
        : "https://www.gnu.org/licenses/gpl-2.0.html",
    textDomain: data.textDomain !== "" ? data.textDomain : "wp2gen",
    domainPath: data.domainPath !== "" ? data.domainPath : "/languages",
    mainClassName: data.mainClassName !== "" ? data.mainClassName : "WP2GEN",
    constantPrefix: data.constantPrefix !== "" ? data.constantPrefix : "WP2GEN",
  };

  return pluginData;
};
