/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsConfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint', 'react-hooks', 'next-recommended'],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:next-recommended/recommended'
  ],
  rules: {
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false
        }
      }
    ]
  }
};
