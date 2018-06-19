import Component from '@ember/component';
// import { debounce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { isBlank } from '@ember/utils';

export default Component.extend({

	basicAjax: service('basic-ajax'),

	// searchTerm: null,

	// actions: {

	// 	search() {
	// 		debounce(this, this._runSearch, 500);
	// 	},

	// 	recordSelected(record) {
	// 		this._recordSelected(record.sobject);
	// 	}

	// },

	searchRecords: task(function * (searchTerm) {

		let searchResults = [];

		if(isBlank(searchTerm)) return searchResults;

		yield timeout(500);

		try {
			searchResults = yield this.get('basicAjax').searchByIdentifier(searchTerm);
		} catch (error) {
			//
		}

		this.set('searchResults', searchResults);

	}).restartable(),

	// async _runSearch() {

	// 	const searchTerm = this.get('searchTerm');
	// 	let searchResults = [];

	// 	try {
	// 		searchResults = await this.get('basicAjax').searchByIdentifier(searchTerm);
	// 	} catch (error) {
	// 		//
	// 	}

	// 	this.set('searchResults', searchResults);
	// },

	// _recordSelected(record) {
	// 	this.set('record', record);
	// }
});
