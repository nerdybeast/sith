import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
	
	auth: Ember.inject.service('auth'),

	beforeModel() {
		if(!this.get('auth.isAuthenticated')) this.transitionTo('application');
	},

	model() {
		return this.get('auth').getProfile();
	}
	
});
