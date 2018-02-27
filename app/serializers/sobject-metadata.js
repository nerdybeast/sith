import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
	
	/**
	 * The data that comes back from the server when calling "store.findAll('sobject-metadata')" has the `type`
	 * property set to `sobject-metadata` but ember data pluralizes this to `sobject-metadatum` which throws a
	 * model not found error (since our model name is "sobject-metadata").
	 * 
	 * Here we are simply stopping this pluralization from happening.
	 * 
	 * @param {string} payloadKey 
	 */
	modelNameFromPayloadKey(payloadKey) {
		return payloadKey;
	}
});
