import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
	
	auth: Ember.inject.service('auth'),

	async beforeModel() {

		// if(!this.get('auth.isAuthenticated')) this.transitionTo('welcome');

		// const authResult = await this.get('auth').handleAuthentication();
		
		// let route = this.get('auth.isAuthenticated') ? 'index' : 'welcome';
		// this.transitionTo(route);
	}
	
});
