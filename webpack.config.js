"use strict";
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
// const { compilerOptions } = require('./tsconfig.json');

module.exports = {
	experiments: {
		asyncWebAssembly: true
	},
	entry: ['./visual/index.ts'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].bundle.js'
	},
	devtool: 'eval-source-map',
	resolve: {
    extensions: ['.js', '.ts', '.wasm', '.wgsl', '.css'],
		modules: [path.resolve(__dirname, 'visual'), 'node_modules'],
		alias: {
			'Universe': path.resolve(__dirname, 'crate/pkg'),
		},
  },
	module: {
		rules: [
			{
				test: /\.(ts|js)$/,
				use: ['ts-loader']
			},
			{
				test: /\.(png|jpg)$/,
				type: "asset/resource",
				parser: {
					dataUrlCondition: {
						maxSize: 8 * 1024, // 8 kB
					}
				}
      },
      {
        test: /\.(wgsl|css)$/,
        type: "asset/source",
      },
    ]
	},
	plugins: [
    new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "template.html"),
    }),
    new webpack.ProvidePlugin({ // FIX: pixi-layers.js throw error ReferenceError: PIXI is not defined
      PIXI: 'pixi.js'
    }),
		new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "crate"),
    }),
	],
}
