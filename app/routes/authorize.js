import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({

	auth: Ember.inject.service('auth'),

	async beforeModel() {

		const auth = this.get('auth');

		await auth.handleAuthentication();

		if(!auth.get('isAuthenticated')) {
			this.transitionTo('welcome');
		}

		await auth.getProfile();
		this.transitionTo('main');
	}

});
