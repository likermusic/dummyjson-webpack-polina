const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");

module.exports = (_, argv = {}) => {
  const isProd = argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",
    devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
    entry: {
      index: "./src/app/index.tsx",
    },
    devServer: {
      static: "./dist",
      hot: true,
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
        minify: isProd
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
      }),
      ...(!isProd ? [new ReactRefreshWebpackPlugin()] : []),
      ...(isProd ? [new MiniCssExtractPlugin()] : []),
    ],
    output: {
      filename: isProd
        ? "[name].[contenthash:8].bundle.js"
        : "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: !isProd,
              getCustomTransformers: !isProd
                ? () => ({
                    before: [ReactRefreshTypeScript()],
                  })
                : undefined,
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
      minimize: isProd,
      minimizer: isProd ? [new CssMinimizerPlugin(), new TerserPlugin()] : [],
    },
  };
};
