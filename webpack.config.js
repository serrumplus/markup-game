const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const CopyWebpackPlugin = require('copy-webpack-plugin');



// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');


module.exports = {
	context: path.resolve(__dirname, 'src'),

	devtool: 'source-map',
	mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',

	entry: {
		custom: ['./app', './css/style.css'],
		fonts: './css/fonts.css',
		tinyslider: ['./css/tiny-slider.css'],
		// styles: ['./css/style.css']
	},

	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'scripts/[name].js',
		chunkFilename: "scripts/[name].chunk.js"
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
						options: {
						// 	modules: true,
						// 	localIdentName: '[name]__[local]--[hash:base64:5]',
							importLoaders: 1,
						}
					},
					// 'sass-loader'
					
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					
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

		// new ExtractCssChunks({
		// 	  // Options similar to the same options in webpackOptions.output
		// 	  // both options are optional
		// 	filename: "[name].css",
		// 	chunkFilename: "[id].css",
		// 	hot: true // optional as the plugin cannot automatically detect if you are using HOT, not for production use
		// })


	].filter(Boolean),

	optimization: {
		// minimizer: [
		// 	new OptimizeCSSAssetsPlugin({})
		// ]
		// runtimeChunk: true,
		splitChunks: {
			cacheGroups: {

				// styles: {
				// 	name: 'fonts',
				// 	test: /\.css$/,
				// 	chunks: 'all',
				// 	enforce: true
				// },

				tinyslider: { 
					test: /tiny-slider/, 
					name: "tinyslider", 
					chunks: "all",
					enforce: true
				},

				sticky: { 
					// test (chunks) {
					// 	console.log(chunks.resource, '  ', /[\\/]node_modules[\\/]react[\\/]/.test(chunks.resource));
					// 	return /[\\/]node_modules[\\/]sticky-js[\\/]/.test(chunks.resource);
					// },
					test: /sticky-js/,
					name: "sticky", 
					chunks: "initial",
					enforce: true
				}

			}
		}
	},

	devServer: {  
	port: 9000,
	hot: true,
		compress: true,
	},
};
