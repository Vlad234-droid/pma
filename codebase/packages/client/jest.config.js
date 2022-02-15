const config = {
  setupFilesAfterEnv: ['./setupTests.js'],
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|svg|jpg|png)$': '__mocks__/fileMock.js',
  },
};

module.exports = config;
