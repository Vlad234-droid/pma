module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    'storybook-mobile',
  ],
  webpackFinal: (config) => {
    return { ...config, module: { ...config.module } };
  },
};
