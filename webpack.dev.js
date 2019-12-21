"use strict";
const DashboardPlugin = require('webpack-dashboard/plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const HOST = "127.0.0.1";
const PORT = "7777";

module.exports = merge(common, {
	devtool: 'eval-source-map',
	devServer: {
		contentBase: ".", // This is only necessary if you want to serve static files.
		hot: true,
		inline: true, // Mode is recommended for Hot Module Replacement as it includes an HMR trigger from the websocket.
		port: PORT,
		host: HOST,
		historyApiFallback: true,
	},
	plugins: [
		new DashboardPlugin(),
	]
})