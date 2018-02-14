import Route from '@ember/routing/route';
import { all } from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
	
	auth: service('auth'),
	basicAjax: service('basic-ajax'),

	beforeModel() {
		if(!this.get('auth.isAuthenticated')) {
			this.get('auth').logout();
			this.transitionTo('welcome');
		}
	},

	async model() {

		const store = this.get('store');
		const basicAjax = this.get('basicAjax');

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
				this.get('auth').logout();
				this.replaceWith('welcome');
			}
		}

	}
});
