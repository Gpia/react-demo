module.exports = {
  // fix error: https://github.com/facebook/jest/issues/6766#ref-issue-345135758
  collectCoverage: true,
  testURL: 'http://localhost',
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src$1',
    '^services(.*)$': '<rootDir>/src/services$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^common(.*)$': '<rootDir>/src/common$1',
  },
};
