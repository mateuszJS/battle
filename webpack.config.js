"use strict";
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // node: {
  //   fs: "empty",
  // },
	entry: ['./visual/index.ts'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].bundle.js'
	},
	devtool: 'eval-source-map',
	resolve: {
    // extensions: ['.js', '.ts', '.vert', '.frag', '.asc'],
    extensions: ['.js', '.ts', '.wasm', '.vert', '.frag', '.asc'],
		alias: {
			
			'~': path.resolve(__dirname, '/visual'),
			'Constants': path.resolve(__dirname, '/logic/constants'),
			'Settings': path.resolve(__dirname, '/visual/modules/gameSettings'),
		}
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
				use: ['ts-loader']
			},
			// {
			// 	// You can provide better regexp
			// 	 test: /\.wasm$/,
			// 	 type: "file-loader"
			//  },
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
      {
				test: /\.(vert|frag)$/,
				use: 'raw-loader'
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
      crateDirectory: path.resolve(__dirname, 'logic'),
			args: '--verbose',
			watchDirectories: [
				path.resolve(__dirname, 'logic')
			],
			forceMode: isProd ? 'production' : 'development', // 'release' if exists, use for any profiling/debugging latency
    }),
	],
}
