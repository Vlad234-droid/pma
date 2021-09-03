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
    resolve: {
      plugins: [new TsconfigPathsPlugin({})],
    },
  });
};
