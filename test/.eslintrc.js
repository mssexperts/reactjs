module.exports = {
  extends: '../.eslintrc.js',
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    describe: true,
    it: true,
    beforeEach: true,
    afterEach: true,
  },
  parser: 'babel-eslint',
  plugins: ['react'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
