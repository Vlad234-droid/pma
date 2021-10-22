module.exports = {
  extends: '../../.eslintrc.js',
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    'no-debugger': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'import/no-unresolved': 'off',
    'import/namespace': ['error', { allowComputed: true }],
  },
};
