module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  rules: {
  },
  globals: {
    //Because we installed the auth0 node module `npm i auth0-js` and
    //imported it inside of ember-cli-build.js
    "auth0": true
  }
};
