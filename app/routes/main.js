import Route from '@ember/routing/route';
import { all } from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
	
	auth: service('auth'),
	basicAjax: service('basic-ajax'),

	beforeModel() {
		if(!this.get('auth.isAuthenticated')) {
			this.auth.logout();
			this.transitionTo('welcome');
		}
	},

	async model() {

		const store = this.store;
		const basicAjax = this.basicAjax;

		const [ orgVersions, traceFlags, debugLevels, logLevels ] = await all([
			store.findAll('org-version'),
			store.findAll('trace-flag'),
			store.findAll('debug-level'),
			basicAjax.getLogTypes()
		]);

		return { orgVersions, traceFlags, debugLevels, logLevels };
	},

	actions: {

		error(error) {
			
			const mainError = error.errors[0];

			if(mainError.statusCode === 401) {
				this.auth.logout();
				this.replaceWith('welcome');
			}
		}

	}
});
