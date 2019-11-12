import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

	auth: service('auth'),

	actions: {
		
		login() {
			this.auth.login();
		},

		enterSite() {
			this.transitionToRoute('main');
		}
	}
});
