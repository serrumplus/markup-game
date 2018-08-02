const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');


module.exports = {
	context: path.resolve(__dirname, 'src'),

	devtool: 'source-map',
	mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',

	entry: {
		tinyslider: './js/vendor/tiny-slider',
		custom: './app',
	},

	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'js/[name].js',
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					process.env.NODE_ENV === 'development' ? 'style-loader' : 
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					{
						loader: 'css-loader',
						// options: {
						// 	modules: true,
						// 	localIdentName: '[name]__[local]--[hash:base64:5]',
						// 	importLoaders: 1,
						// }
					},
					'sass-loader'
				],
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'img/',
							name: '[name].[ext]',
						},
					},
				],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-sprite-loader',
						options: { 
							extract: false,
						}
					},
				]
			}
		],
	},

	resolve: {
		extensions: ['.js', '.jsx', 'scss'],
	},

	plugins: [
		process.env.NODE_ENV === 'production' && new MiniCssExtractPlugin({
			filename: "css/style.css",
		}),   

		// process.env.NODE_ENV === 'development' && new webpack.NamedModulesPlugin(),
		process.env.NODE_ENV === 'development' && new webpack.HotModuleReplacementPlugin(),

		new HtmlWebpackPlugin({
			template: './index.html',
		}),

		// new SpriteLoaderPlugin(),

	].filter(Boolean),

	optimization: {
		// minimizer: [
		// 	new OptimizeCSSAssetsPlugin({})
		// ]
		// splitChunks: {
		// 	chunks: "all",
		// }
	},

	devServer: {  
	port: 9000,
	hot: true,
		compress: true,
	},
};
