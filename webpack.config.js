const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const CopyWebpackPlugin = require('copy-webpack-plugin');

// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');


module.exports = {
	context: path.resolve(__dirname, 'src'),

	devtool: 'source-map',
	mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',

	entry: {
		tinyslider: ['tiny-slider', './css/tiny-slider.css'],
		custom: './app',
		sticky: ['sticky-js'],
		// styles: ['./css/style.css']
	},

	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'scripts/[name].js',
		// chunkFilename: 'js/[id].chunk.js',
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
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [ 
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts/',
							name: '[name].[ext]',
						},
					}
				]
			}
		],
	},

	resolve: {
		extensions: ['.js', '.jsx', 'scss'],
	},

	plugins: [

		process.env.NODE_ENV === 'production' && new MiniCssExtractPlugin({
			filename: "css/[name].css",
		}),   

		// process.env.NODE_ENV === 'development' && new webpack.NamedModulesPlugin(),
		process.env.NODE_ENV === 'development' && new webpack.HotModuleReplacementPlugin(),

		new HtmlWebpackPlugin({
			template: './index.html',
			inject: false
		}),

		// new SpriteLoaderPlugin(),

		new CopyWebpackPlugin([
			{ from: './img/logo.png', to: './img/' },
			{ from: './img/temp/promo.png', to: './img/temp' }
		]),

		


	].filter(Boolean),

	optimization: {
		// minimizer: [
		// 	new OptimizeCSSAssetsPlugin({})
		// ]
		splitChunks: {
			cacheGroups: {
				// styles: {
				// 	name: 'styles',
				// 	test: /\.css$/,
				// 	chunks: 'all',
				// 	enforce: true
				// }
			}
		}
	},

	devServer: {  
	port: 9000,
	hot: true,
		compress: true,
	},
};
