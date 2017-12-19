import Ember from 'ember';
import Controller from '@ember/controller';

export default Controller.extend({

	auth: Ember.inject.service('auth'),

	actions: {

		logout() {
			this.get('auth').logout();
			this.transitionToRoute('welcome');
		}

	}

});
