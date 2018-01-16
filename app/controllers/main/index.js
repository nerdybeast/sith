import Controller, { inject as injectController } from '@ember/controller';
import { inject as injectService } from '@ember/service'

export default Controller.extend({
	
	mainController: injectController('main'),
	auth: injectService('auth'),

	updateTraceFlagsFromStore() {
		this.get('mainController').set('model.traceFlags', this.get('store').peekAll('trace-flag'));
	},

	actions: {
		
		async refreshTraceFlags() {
			
			try {
			
				const store = this.get('store');

				const localTraceFlags = store.peekAll('trace-flag');

				//Using "query" instead of "findAll" because findAll returns a mix of what was returned from the server as well as 
				//what's still stored locally in ember data. Here we need to know exactly what came back from the server so that we 
				//can delete records from ember data that are no longer in Salesforce.
				const remoteTraceFlags = await store.query('trace-flag', {});

				localTraceFlags.forEach(localTraceFlag => {
					if(!remoteTraceFlags.any(remoteTraceFlag => remoteTraceFlag.get('id') === localTraceFlag.get('id'))) {
						store.unloadRecord(localTraceFlag);
					}
				});

				this.updateTraceFlagsFromStore();

			} catch (error) {
				return error;
			}

		},

		async createNewTraceFlag() {
			
			this.get('store').createRecord('trace-flag', {
				logType: 'USER_DEBUG',
				tracedEntityId: this.get('auth.userInformation.userId')
			});

			this.updateTraceFlagsFromStore();
		},

		async saveNewTraceFlag(traceFlag) {
			await traceFlag.save();
			this.updateTraceFlagsFromStore();
		},

		async updateTraceFlag(traceFlag) {
			await traceFlag.save();
			this.updateTraceFlagsFromStore();
		},

		async deleteTraceFlag(traceFlag) {
			await traceFlag.destroyRecord();
			this.updateTraceFlagsFromStore();
		},

		cancelModification(traceFlag) {
			traceFlag.rollbackAttributes();
			this.updateTraceFlagsFromStore();
		}
	}
});
