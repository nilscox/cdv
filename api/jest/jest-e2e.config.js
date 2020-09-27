process.env.TZ = 'UTC';

module.exports = {
  verbose: true,
  notify: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../src',
  testEnvironment: 'node',
  testMatch: ["**/*.e2e-test.ts"],
  moduleNameMapper: {
    'Common/(.*)': '<rootDir>/common/$1',
  }
}