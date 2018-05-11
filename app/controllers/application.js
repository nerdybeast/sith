import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

	auth: service('auth'),

	actions: {

		logout() {
			this.get('auth').logout();
			this.transitionToRoute('welcome');
		}

	}

});
