import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({

	auth: Ember.inject.service('auth'),

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
