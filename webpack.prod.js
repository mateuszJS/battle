"use strict";
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
	plugins: [
		new UglifyJSPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'assets', to: 'assets' },
      ],
    })
		// new BundleAnalyzerPlugin()
	]
})