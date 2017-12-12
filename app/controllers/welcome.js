import Ember from 'ember';
import { debug } from '@ember/debug';

export default Ember.Controller.extend({
	actions: {
		login() {
			debug('logged in');
		}
	}
});
