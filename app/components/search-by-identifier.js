import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { isBlank } from '@ember/utils';

export default Component.extend({

	basicAjax: service('basic-ajax'),

	searchTerm: null,
	searchResults: null,
	noResultsMessage: 'No records found',

	actions: {

		recordSelected(record) {
			this.set('record', record.sobject);
		}

	},

	searchRecords: task(function * (searchTerm) {

		let searchResults = [];

		if(isBlank(searchTerm)) {
			this.set('noResultsMessage', 'No records found');
			return searchResults;
		}

		yield timeout(500);

		try {
			searchResults = yield this.get('basicAjax').searchByIdentifier(searchTerm);
		} catch (error) {
			this.set('noResultsMessage', error.payload.errors[0].message);
		}

		this.set('searchResults', searchResults);

	}).restartable()

});
