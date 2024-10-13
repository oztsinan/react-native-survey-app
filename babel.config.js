module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
    plugins: [
      // src import kısayolu için module-resolver eklendi
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
          },
        },
      ],
    ],
  };
};
