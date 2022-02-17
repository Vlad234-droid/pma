const config = {
  setupFilesAfterEnv: ['./setupTests.js'],
  roots: ['src'],
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|svg|jpg|png)$': '__mocks__/fileMock.js',
  },
  collectCoverageFrom: ['!src/**/*.stories.tsx', '!src/utils/test/mocks/*', '!coverage/**', '!.storybook/**'],
};

module.exports = config;
