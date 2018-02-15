/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
	
	let app = new EmberApp(defaults, {
		
		'ember-cli-babel': {
			includePolyfill: true
		},

		//Available because we ran `ember install ember-cli-sass`
		sassOptions: {
			includePaths: ['node_modules/bulmaswatch/superhero']
		},

		//Didn't have to install this, it comes packaged with Ember by default: https://github.com/babel/ember-cli-babel
		babel: {
			
			//Needed to allow debugging this application in an ide (vscode for instance) instead of the browser.
			sourceMaps: 'inline',

			//Available plugins: https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js
			plugins: [
				
				//allows using async/await
				//NOTE: this plugin requires babel-polyfill
				//See: https://github.com/babel/ember-cli-babel#polyfill
				'transform-async-to-generator'
			]
		}
	});

	// Use `app.import` to add additional libraries to the generated
	// output files.
	//
	// If you need to use different assets in different
	// environments, specify an object as the first parameter. That
	// object's keys should be the environment name and the values
	// should be the asset to use in that environment.
	//
	// If the library that you are including contains AMD or ES6
	// modules that you would like to import into your application
	// please specify an object with the list of modules as keys
	// along with the exports of each module as its value.

	/**
	 * 1. Installed tippy.js: `npm i tippy.js`
	 * 2. Import from node_modules which will add "tippy" to the window object: `window.tippy()`
	 * 3. Since there is now a global window property called "tippy" it may be weird to see this variable
	 * used throughout the code without knowing where it came from, to resolve let's create a vendor shim.
	 * 4. Created a vendor shim `ember g vendor-shim tippy`, this allows us to `import tippy from "tippy"`,
	 * this es6 import is basically an alias for "window.tippy".
	 */
	app.import('node_modules/tippy.js/dist/tippy.all.min.js');
	app.import('vendor/shims/tippy.js');

	app.import('node_modules/auth0-js/build/auth0.js');
	app.import('vendor/shims/auth0.js');
	
	app.import('node_modules/toastr/build/toastr.min.css');
	app.import('node_modules/toastr/build/toastr.min.js');
	app.import('vendor/shims/toastr.js');

	app.import('node_modules/simplebar/dist/simplebar.js');
	app.import('node_modules/simplebar/dist/simplebar.css');
	app.import('vendor/shims/simplebar.js');

	return app.toTree();
};
