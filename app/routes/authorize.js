import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

	auth: service('auth'),

	async beforeModel() {

		const auth = this.auth;

		await auth.handleAuthentication();

		if(!auth.get('isAuthenticated')) {
			this.transitionTo('welcome');
		}

		await auth.getProfile();
		this.transitionTo('main');
	}

});
