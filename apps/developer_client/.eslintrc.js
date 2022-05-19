module.exports = {
  ...require('config/eslint-remix.js'),
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
