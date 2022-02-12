const config = {
  setupFilesAfterEnv: ['./setupTests.js'],
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.css$': '__mocks__/styleMock.js',
  },
};

module.exports = config;
