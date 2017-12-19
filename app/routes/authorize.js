import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({

	auth: Ember.inject.service('auth'),

	async beforeModel() {
		await this.get('auth').handleAuthentication();
		let route = this.get('auth.isAuthenticated') ? 'main' : 'welcome';
		this.transitionTo(route);
	}

});
