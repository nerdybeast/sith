import Ember from 'ember';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

	ajax: Ember.inject.service('ajax'),
	auth: Ember.inject.service('auth'),

	fetchingLogContent: false,

	activeApexLogRecord: computed('model.logs.@each.isActive', function() {
		return this.get('model.logs').find(log => log.get('isActive'));
	}),

	actions: {

		setActiveLog(apexLogId) {

			const apexLog = this.get('model.logs').find(log => log.get('id') === apexLogId);

			this.get('model.logs').forEach(log => log.set('isActive', false));
			apexLog.set('isActive', true);
		},

		updateApexLogsFromSocket(rawApexLogResponse) {

			const store = this.get('store');
			const localLogs = store.peekAll('apex-log').filter(log => !log.get('isActive'));

			const remoteLogIds = rawApexLogResponse.data.map(x => x.id);

			localLogs.forEach(log => {
				if(!remoteLogIds.any(remoteLogId => remoteLogId === log.get('id'))) {
					store.unloadRecord(log);
				}
			});

			const apexLogs = this.get('store').push(rawApexLogResponse);
			this.set('model.logs', apexLogs);
		}
	}

});
