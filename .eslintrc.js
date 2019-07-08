module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  plugins: ['react', 'html', 'filenames'],
  rules: {
    'linebreak-style': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'filenames/match-exported': [2, 'kebab'],
    'no-await-in-loop': 2,
    'no-console': 2,
    'no-debugger': 2,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-empty-function': 2,
    'no-empty-pattern': 2,
    'no-empty': 2,
    'no-eval': 2,
    'no-extra-semi': 2,
    'no-implicit-globals': 2,
    'no-invalid-regexp': 2,
    'no-label-var': 2,
    'no-lonely-if': 2,
    'no-mixed-requires': 2,
    'no-multi-str': 2,
    'no-path-concat': 2,
    'no-process-exit': 2,
    'no-restricted-globals': 2,
    'no-tabs': 2,
    'no-trailing-spaces': 2,
    'no-unexpected-multiline': 2,
    'no-unneeded-ternary': 2,
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-useless-concat': 2,
    'no-useless-constructor': 2,
    'no-useless-return': 2,
    'no-var': 2,
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 2,
        },
        ObjectPattern: {
          multiline: true,
          minProperties: 2,
        },
        ImportDeclaration: 'never',
      },
    ],
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: true,
      },
    ],
    'prefer-const': 2,
    'prefer-destructuring': 2,
    'prefer-spread': 2,
    'import/no-named-as-default': 0,
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    'react/forbid-prop-types': 'error',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/jsx-curly-spacing': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
      },
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unused-state': 'error',
    'react/prop-types': 'error',
    'react/sort-comp': 'error',
    'sort-keys': [
      'error',
      'asc',
      {
        caseSensitive: true,
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 0,
      },
    ],
    'newline-after-var': ['error', 'always'],
    'array-bracket-spacing': 'error',
    'consistent-return': [
      'error',
      {
        treatUndefinedAsUnspecified: true,
      },
    ],
    'key-spacing': [
      'error',
      {
        afterColon: true,
      },
    ],
    'line-comment-position': [
      'error',
      {
        position: 'above',
      },
    ],
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    'max-len': [
      'error',
      {
        code: 160,
        comments: 160,
        ignoreUrls: true,
      },
    ],
    'max-lines': [
      'error',
      {
        max: 500,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'no-irregular-whitespace': [
      'error',
      {
        skipTemplates: true,
        skipRegExps: true,
        skipComments: true,
      },
    ],
    'newline-before-return': 2,
    'object-curly-spacing': 'error',
    'arrow-parens': ['error', 'always'],
    quotes: ['error', 'single'],
  },
};
