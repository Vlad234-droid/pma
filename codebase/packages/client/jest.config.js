const config = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  roots: ['src'],
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(svg|jpg|png)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(json)$': '<rootDir>/__mocks__/fileMock.js',
  },
  collectCoverageFrom: [
    '!src/**/*.stories.tsx',
    '!src/utils/test/mocks/*',
    '!coverage/**',
    '!.storybook/**',
    '!locales/**',
  ],
};

module.exports = config;
