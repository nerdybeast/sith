import Ember from 'ember';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import ENV from 'sith/config/environment';
import { debug } from '@ember/debug';

export default Controller.extend({

	ajax: Ember.inject.service('ajax'),
	auth: Ember.inject.service('auth'),

	fetchingLogContent: false,

	activeApexLogRecord: computed('model.logs.@each.isActive', function() {
		return this.get('model.logs').find(log => log.get('isActive'));
	}),

	// async getApexLogBody(apexLogId, apiVersion) {

	// 	const { sessionId, instanceUrl, organizationId, userId } = this.get('auth.userInformation');

	// 	const apexLogBody = await this.get('ajax').post(`${ENV.SITH_API_DOMAIN}/api/sobjects/apex-log-body`, {
	// 		headers: {
	// 			'salesforce-session-token': sessionId,
	// 			'instance-url': instanceUrl,
	// 			'org-id': organizationId,
	// 			'user-id': userId
	// 		},
	// 		data: {
	// 			apexLogId,
	// 			apiVersion
	// 		},
	// 		dataType: 'text'
	// 	});

	// 	return apexLogBody;
	// },

	actions: {

		setActiveLog(apexLogId) {

			const apexLog = this.get('model.logs').find(log => log.get('id') === apexLogId);

			this.get('model.logs').forEach(log => log.set('isActive', false));
			apexLog.set('isActive', true);
		},

		// async fetchLogContent(apexLogId) {

		// 	if(this.get('fetchingLogContent')) return;

		// 	//const store = this.get('store');
		// 	//const apexLog = store.peekRecord('apex-log', apexLogId);
		// 	const apexLog = this.get('model.logs').find(log => log.get('id') === apexLogId);

		// 	this.get('model.logs').forEach(log => log.set('isActive', false));
		// 	apexLog.set('isActive', true);

		// 	if(!apexLog.get('body')) {

		// 		this.set('fetchingLogContent', true);

		// 		//TODO: Consider if we need to allow the user to specify a different api version for this call.
		// 		const latestOrgVersion = this.get('store').peekAll('org-version').sortBy('id').get('lastObject');

		// 		let apexLogBody;

		// 		try {

		// 			apexLogBody = await this.getApexLogBody(apexLogId, latestOrgVersion.get('id'));

		// 		} catch(error) {

		// 			debug(error);

		// 		}

		// 		apexLog.set('body', apexLogBody);
		// 	}

		// 	this.set('fetchingLogContent', false);
		// }

	}

});
