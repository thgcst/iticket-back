module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    "babel-plugin-transform-typescript-metadata",
    [
      "module-resolver",
      {
        alias: {
          "@config": "./src/config",
          "@modules": "./src/modules",
          "@shared": "./src/shared",
        },
      },
    ],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ],
  ignore: ["**/*.spec.ts"],
};
