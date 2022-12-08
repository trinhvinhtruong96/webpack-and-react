const path = require('path');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ReactRefreshPlugin = require('react-refresh/babel');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	style: path.join(__dirname, 'app/main.css')
};

const common = {
	devtool: 'source-map',
	entry: {
		app: PATHS.app,
		style: PATHS.style
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: PATHS.build,
		filename: '[name].[chunkhash].js',
		chunkFilename: '[chunkhash].js',
		clean: true,
	},
	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.css$/,
	// 			use: [
	// 				'style-loader',
	// 				'css-loader',
	// 			],
	// 			include: PATHS.app,
	// 		},
	// 	],
	// },
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'app/htmlTemplate/template.html',
			title: 'Kanban app',
			appMountId: 'app',
		})
	]
}

// Default configuration
if (TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		mode: 'development',
		stats: 'errors-only',
		devServer: {
			static: PATHS.build,
			historyApiFallback: true,
			hot: true,
			compress: true,
			host: process.env.HOST,
			port: process.env.PORT,
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					use: {
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							plugins: [ReactRefreshPlugin]
						}
					},
					include: PATHS.app
				},
				{
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader',
					],
					include: PATHS.app,
				},
			],
		},
		plugins: [
			new ESLintPlugin({
				extensions: ['js', 'jsx']
			}),
			new StylelintPlugin(),
			new ReactRefreshWebpackPlugin(),
		],
	});
}

if (TARGET === 'build') {
	module.exports = merge(common, {
		mode: 'production',
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					use: {
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
						}
					},
					include: PATHS.app
				},
				{
					test: /\.css$/,
					use: [MiniCssExtractPlugin.loader, 'css-loader'],
					include: PATHS.app,
				},
			],
		},
		entry: {
			vendor: Object.keys(pkg.dependencies).filter(function (v) {
				// Exclude alt-utils as it won't work with this setup
				// due to the way the package has been designed
				// (no package.json main).
				return v !== 'alt-utils' && v !== 'node-uuid';
			})
		},
		optimization: {
			minimize: true,
			minimizer: [new TerserPlugin({
				test: /\.jsx?$/,
			})],
			splitChunks: { chunks: 'all' },
			runtimeChunk: { name: 'manifest' },
		},
		plugins: [new MiniCssExtractPlugin({
			filename: '[name].[chunkhash].css'
		})],
	});
}

