const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.js");
const autoprefixer = require("autoprefixer");

module.exports = merge(common, {
  name: "client",
  mode: "production",
  devtool: "eval-source-map",
  entry: {
    "role-dashboard": "./src/client.tsx",
  },
  output: {
    path: path.resolve(__dirname, "../../dist"),
    filename: "[name].js",
    pathinfo: false,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.m?(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              configFile: path.resolve("babel.config.js"),
            },
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [autoprefixer],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        mimetype: "image/svg+xml",
        scheme: "data",
        type: "asset/resource",
        generator: {
          filename: "icons/[hash].svg",
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
    moduleIds: "named",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](?!@ppb)/,
        },
      },
    },
    removeAvailableModules: false,
    removeEmptyChunks: false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new WebpackManifestPlugin({
      writeToFileEmit: true,
    }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]_[hash].css",
      chunkFilename: "[id].css",
    }),
  ],
  watchOptions: {
    // for some systems, watching many files can result in a lot of CPU or memory usage
    // https://webpack.js.org/configuration/watch/#watchoptionsignored
    // don't use this pattern, if you have a monorepo with linked packages
    ignored: /node_modules/,
  },
});
