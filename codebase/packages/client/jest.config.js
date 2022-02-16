const config = {
  setupFilesAfterEnv: ['./setupTests.js'],
  roots: ['src'],
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|svg|jpg|png)$': '__mocks__/fileMock.js',
  },
};

module.exports = config;
