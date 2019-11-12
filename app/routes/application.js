import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

	auth: service('auth'),
	basicAjax: service('basic-ajax'),

	async beforeModel() {

		//Can happen if the user closes the site which clears sessionStorage even though they are still authenticated.
		if(this.get('auth.isAuthenticated') && !sessionStorage.getItem('profile')) {
			await this.auth.getProfile();
		}
	},

	afterModel() {
		this.basicAjax.pingBackend();
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
