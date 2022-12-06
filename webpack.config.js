const path = require('path');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ReactRefreshPlugin = require('react-refresh/babel');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

const common = {
	devtool: 'source-map',
	entry: {
		app: PATHS.app
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	module: {
		rules: [
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
				}
			],
		},
		performance: {
			hints: false,
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
				}
			],
		},
	});
}

