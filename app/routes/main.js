import Ember from 'ember';
import Route from '@ember/routing/route';
import { all } from 'rsvp';

export default Route.extend({
	
	auth: Ember.inject.service('auth'),

	beforeModel() {
		if(!this.get('auth.isAuthenticated')) {
			this.get('auth').logout();
			this.transitionTo('welcome');
		}
	},

	async model() {

		const store = this.get('store');

		const [ orgVersions, traceFlags, debugLevels ] = await all([
			store.findAll('org-version'),
			store.findAll('trace-flag'),
			store.findAll('debug-level')
		]);

		return { orgVersions, traceFlags, debugLevels };
	},

	actions: {

		error(error) {
			
			const mainError = error.errors[0];

			if(mainError.statusCode === 401) {
				this.get('auth').logout();
				this.replaceWith('welcome');
			}
		}

	}
});
