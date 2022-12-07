const path = require('path');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ReactRefreshPlugin = require('react-refresh/babel');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const pkg = require('./package.json');

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
		filename: '[name].js'
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
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
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
	});
}

