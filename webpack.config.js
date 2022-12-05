const path = require('path');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');

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
      }
    ],
  },
  plugins: [new ESLintPlugin()],
}

// Default configuration
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    mode: 'production',
    stats: 'errors-only',
    devServer: {
      static: PATHS.build,
      historyApiFallback: true,
      hot: true,
      compress: true,
      host: process.env.HOST,
      port: process.env.PORT,
      client: {
        progress: true,
      },
    },
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    mode: 'development',
  });
}

