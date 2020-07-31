const withLess = require("@zeit/next-less");
const withFonts = require("next-fonts");

module.exports = withLess({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
});
