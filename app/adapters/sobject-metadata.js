import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

	namespace: 'api/metadata/describe',

	pathForType(modelName) {
		return modelName;
	},

	/**
	 * Calling `store.findRecord('sobject-metadat', some-id)` triggers ember data to create a url that looks like
	 * `api/metadata/describe/sobject-metadata/Account` but our api isn't expecting the `sobject-metadata` in the
	 * url so here we are simply preventing the modelName of "sobject-metadata" from being injected into the url.
	 * @param {string} id - this will be the sobject name such as "Opportunity" or "Account"
	 */
	urlForFindRecord(id/*, modelName, snapshot*/) {
		return `${this.buildURL()}/${id}`;
	},

	urlForFindAll() {
		return `${this.get('host')}/${this.get('namespace')}/global`;
	},

	urlForQuery(query/*, modelName*/) {
		return `${this.get('host')}/${this.get('namespace')}/global`;
	}

});