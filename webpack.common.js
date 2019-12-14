"use strict";
const path = require("path")
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin")
const webpack = require('webpack');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "7777";

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
	entry: {
		index: `${__dirname}/src/index.ts`,
		// vendor: ['pixi.js'],
	},
	output: {
		path: `${__dirname}/dist`,
		// publicPath: '/',
		// filename: '[name].bundle.js'
	},
	devtool: 'eval-source-map',
	resolve: {
		extensions: ['.js', '.ts']
		// extensions: ['.js', '.ts', '.wasm']
  },
  stats: { // looks like the 'minimal', but with colors
    all: false,
    modules: false,
    errors: true,
    warnings: true
  },
	module: {
		rules: [
			{
				test: /\.(ts|js)$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'ts-loader']
			},
			{
				test: /\.(svg|png|jpg|woff|woff2|eot|ttf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			},
    	]
	},
	devServer: {
		contentBase: "./dist",
		// enable HMR
		hot: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		port: PORT,
		host: HOST
	},
	plugins: [
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "crate"),
      extraArgs: "--out-name index",
    }),
		new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: 'template.html'
    }),
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    }),
	]
}
