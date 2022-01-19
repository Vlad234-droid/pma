/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'tesco',
    projectName: 'pma',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    output: {
      path: path.resolve(__dirname, 'build'),
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(dotenv.config().parsed),
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
    resolve: {
      plugins: [new TsconfigPathsPlugin({})],
    },
  });
};
