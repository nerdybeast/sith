import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({

	init() {

		this._super(...arguments);

	},

	actions: {

		setAsActiveSobject(sobjectId) {
			this.get('onClick')(sobjectId);
		}

	},

	search: task(function * (searchTerm) {

		yield timeout(300);

		try {

			yield this.get('onSearch')(searchTerm);

		} catch(error) {
			console.error(error);
		}

	}).restartable()

});
