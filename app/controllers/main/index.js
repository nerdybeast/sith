import Controller, {
  inject as injectController
} from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	
	mainController: injectController('main'),
	auth: service('auth'),

	updateTraceFlagsFromStore() {
		this.mainController.set('model.traceFlags', this.store.peekAll('trace-flag'));
	},

	purgeTraceFlagsNoLongerInSalesforce(remoteTraceFlags) {

		const store = this.store;

		//Filter by "isNew" to prevent deleting a new trace flag the user is currently creating.
		const localTraceFlags = store.peekAll('trace-flag').filterBy('isNew', false);

		localTraceFlags.forEach(localTraceFlag => {
			
			//True if we have a trace flag locally that is no longer in Salesforce.
			if(!remoteTraceFlags.any(remoteTraceFlag => remoteTraceFlag.get('id') === localTraceFlag.get('id'))) {
				store.unloadRecord(localTraceFlag);
			}
		});

		this.updateTraceFlagsFromStore();
	},

	actions: {
		
		async refreshTraceFlags() {
			
			try {
			
				const store = this.store;

				//Using "query" instead of "findAll" because findAll returns a mix of what was returned from the server as well as 
				//what's still stored locally in ember data. Here we need to know exactly what came back from the server so that we 
				//can delete records from ember data that are no longer in Salesforce.
				const remoteTraceFlags = await store.query('trace-flag', {});

				this.purgeTraceFlagsNoLongerInSalesforce(remoteTraceFlags);

			} catch (error) {
				return error;
			}

		},

		async createNewTraceFlag() {
			
			this.store.createRecord('trace-flag', {
				logType: 'USER_DEBUG',
				tracedEntityId: this.get('auth.userInformation.userId')
			});

			this.updateTraceFlagsFromStore();
		},

		async saveNewTraceFlag(traceFlag) {
			const debugLevel = this.store.peekRecord('debug-level', traceFlag.get('debugLevelId'));
			traceFlag.set('debugLevel', debugLevel);
			await traceFlag.save();
			this.updateTraceFlagsFromStore();
		},

		async updateTraceFlag(traceFlag) {
			await traceFlag.save();
			this.updateTraceFlagsFromStore();
		},

		updateTraceFlagsFromSocket(traceFlags) {
			
			const remoteTraceFlagIds = traceFlags.data.map(x => x.id);

			if(remoteTraceFlagIds.length === 0) {
				this.purgeTraceFlagsNoLongerInSalesforce([]);
				return;
			}

			const store = this.store;
			store.push(traceFlags);

			const traceFlagsInSalesforce = store.peekAll('trace-flag').filter(x => {
				return remoteTraceFlagIds.includes(x.get('id'));
			});

			this.purgeTraceFlagsNoLongerInSalesforce(traceFlagsInSalesforce);
		},

		async deleteTraceFlag(traceFlag) {
			await traceFlag.destroyRecord();
			this.updateTraceFlagsFromStore();
		},

		cancelModification(traceFlag) {
			traceFlag.rollbackAttributes();
			this.updateTraceFlagsFromStore();
		},

		logout() {
			this.auth.logout();
			this.transitionToRoute('welcome');
		}
	}
});
