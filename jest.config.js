module.exports = {
  modulePaths: ['<rootDir>'],
  testPathIgnorePatterns: ['<rootDir>/src/tests/firestore-test'],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    'ng2-charts': '<rootDir>/node_modules/ng2-charts/fesm2020/ng2-charts.mjs',
  },

  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
};
