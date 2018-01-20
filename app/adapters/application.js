import DS from 'ember-data';
import ENV from 'sith/config/environment';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

/**
 * Application level adapter, all requests through ember data will use this as a base configuration.
 * This defaults requests to use "http://our-domain/api"
 */
export default DS.JSONAPIAdapter.extend({
	auth: inject('auth'),
	store: inject('store'),
	host: ENV.SITH_API_DOMAIN,
	namespace: 'api',
	headers: computed('auth.userInformation', function() {
		
		const { sessionId, instanceUrl, organizationId, userId } = this.get('auth.userInformation');
		
		//TODO: this needs to be done better, somehow...
		const orgVersion = this.get('store').peekAll('org-version').sortBy('id').get('lastObject.version');

		return { 
			'salesforce-session-token': sessionId,
			'instance-url': instanceUrl,
			'org-id': organizationId,
			'user-id': userId,
			'org-version': orgVersion
		};
	})
});
