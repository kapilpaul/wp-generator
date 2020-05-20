module.exports = {
  publicPath: "/",
  assetsDir: "assets/",
  chainWebpack: (config) => {
    config.performance.maxEntrypointSize(400000).maxAssetSize(400000);
  },
};
