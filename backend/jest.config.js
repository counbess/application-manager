module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
    './src/**/*.[jt]s',
    '!**/node_modules/**',
  ],
  coverageReporters: ['text', 'json-summary', 'lcov'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
