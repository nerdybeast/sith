/* eslint-env node */
'use strict';

module.exports = function(environment) {
	let ENV = {
		modulePrefix: 'sith',
		environment,
		rootURL: '/',
		locationType: 'auto',
		EmberENV: {
			FEATURES: {
			// Here you can enable experimental features on an ember canary build
			// e.g. 'with-controller': true
			},
			EXTEND_PROTOTYPES: {
			// Prevent Ember Data from overriding Date.parse.
			Date: false
			}
		},
		APP: {
			// Here you can pass flags/options to your application instance
			// when it is created
		},
		'ember-websockets': {
			socketIO: true
		}
	};

	if (environment === 'development') {
		// ENV.APP.LOG_RESOLVER = true;
		// ENV.APP.LOG_ACTIVE_GENERATION = true;
		// ENV.APP.LOG_TRANSITIONS = true;
		// ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
		// ENV.APP.LOG_VIEW_LOOKUPS = true;
	}

	if (environment === 'test') {
		// Testem prefers this...
		ENV.locationType = 'none';

		// keep test console output quieter
		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = '#ember-testing';
	}

	if (environment === 'production') {
		// here you can enable a production-specific feature
	}

	ENV.AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
	ENV.AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
	ENV.AUTH0_REDIRECT_URL = process.env.AUTH0_REDIRECT_URL;
	ENV.AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
	ENV.SITH_API_DOMAIN = process.env.SITH_API_DOMAIN;

	return ENV;
};
