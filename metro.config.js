const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

//eslint-disable-next-line
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./src/assets/global.css" });
