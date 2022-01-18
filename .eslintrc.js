module.exports = {
  plugins: ['jest'],
  extends: ['eslint-config-airbnb/base'],
  globals: {
    expect: false,
    test: false,
    describe: false,
    jest: false,
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'arrow-parens': [1, 'as-needed'],
    'no-multiple-empty-lines': [1, { max: 1 }],
    'no-restricted-syntax': [1],
    'object-curly-newline': [1],
    'no-useless-escape': [1],
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
  },
};
