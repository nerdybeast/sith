import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({

	search: task(function * (searchTerm) {

		yield timeout(300);

		try {

			yield this.get('onSearch')(searchTerm);

		} catch(error) {
			console.error(error);
		}

	}).restartable()

});
