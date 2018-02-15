import Ember from 'ember';

export default Ember.Controller.extend({

	auth: Ember.inject.service('auth'),

	actions: {
		
		login() {
			this.get('auth').login();
		},

		enterSite() {
			this.transitionToRoute('main');
		}
	}
});
