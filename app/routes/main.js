import Ember from 'ember';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
	
	auth: Ember.inject.service('auth'),

	beforeModel() {
		if(!this.get('auth.isAuthenticated')) this.transitionTo('application');
	},

	async model() {

		const profile = await this.get('auth').getProfile();
		const orgVersions = await this.get('store').findAll('org-version');

		return hash({ profile, orgVersions});
	}
	
});
