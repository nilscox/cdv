require('dotenv').config({ path: '.env.test' });

module.exports = {
  verbose: true,
  notify: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../src',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/$1',
  },
};
