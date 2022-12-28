const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./visual/index.ts",
  devtool: "eval-source-map",
  devServer: {
    static: "./dist",
  },
  resolve: {
    extensions: [".ts", ".js", '.frag', '.wasm', '.vert', '.asc', '.png', '.jpg'],
    modules: [path.resolve(__dirname, "visual"), "node_modules"], // to use absolute path in src
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(frag|vert)$/,
        type: "asset/source",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
      },
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    runtimeChunk: "single",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template.html',
    }),
  ],
};
