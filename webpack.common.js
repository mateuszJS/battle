"use strict";
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  node: {
    fs: "empty",
  },
	entry: {
		index: `${__dirname}/visual/index.ts`,
	},
	output: {
		path: `${__dirname}/dist`,
		publicPath: '/',
		filename: '[name].bundle.js'
	},
	devtool: 'eval-source-map',
	resolve: {
    extensions: ['.js', '.ts', '.wasm', '.vert', '.frag', '.asc'],
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
      {
				test: /\.(vert|frag)$/,
				use: 'raw-loader'
			},
    ]
	},
	plugins: [
    new HtmlWebpackPlugin({
      template: 'template.html'
    }),
    new webpack.ProvidePlugin({ // FIX: pixi-layers.js throw error ReferenceError: PIXI is not defined
      PIXI: 'pixi.js'
    }),
	],
}
