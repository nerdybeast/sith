module.exports = {
  env: {
    embertest: true
  },
  globals: {
    //Because we installed the auth0 node module `npm i auth0-js` and
    //imported it inside of ember-cli-build.js
    "auth0": true,
    //Because we installed the toastr node module `npm i toastr` and imported it inside of ember-cli-build.js
    "toastr": true
  }
};
