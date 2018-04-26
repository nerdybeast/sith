import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

	auth: service('auth'),

	async beforeModel() {

		//Can happen if the user closes the site which clears sessionStorage even though they are still authenticated.
		if(this.get('auth.isAuthenticated') && !sessionStorage.getItem('profile')) {
			await this.get('auth').getProfile();
		}
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
