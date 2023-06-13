module.exports = function config(api) {
  api.cache(true);
  const presets = [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ];
  const plugins = [
    "@babel/plugin-proposal-class-properties"
  ];

  return {
    presets,
    plugins
  };
};
