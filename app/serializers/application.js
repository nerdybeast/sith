import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
	/**
	 * The json api spec sends payload attributes over the wire as dasherized values example:
	 * {
	 *   "id": "1234",
	 *   "debug-level": "INFO"
	 * }
	 * 
	 * The Sith Api sends these values over camelCased so we need to override this method to prevent Ember Data
	 * from looking for a dasherized attribute name.
	 * 
	 * The original error produced by Ember Data that led to this change: "Assertion Failed: Your payload for 'trace-flag' contains 'apexCode',
	 * but your serializer is setup to look for 'apex-code'. This is most likely because Ember Data's JSON API serializer dasherizes attribute keys by default.
	 * You should subclass JSONAPISerializer and implement 'keyForAttribute(key) { return key; }' to prevent Ember Data from customizing your attribute keys."
	 */
	keyForAttribute(attr) {
		return attr;
	},

	keyForRelationship(attr) {
		return attr;
	}
});
