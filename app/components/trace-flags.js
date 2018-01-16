import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { debug } from '@ember/debug';
import moment from 'moment';

export default Component.extend({

	//Inject these services
	toast: inject('toast'),
	auth: inject('auth'),

	//Set on component creation
	traceFlags: null,
	debugLevels: null,

	newDebugLevelName: null,

	newTraceFlag: computed('traceFlags.@each.isNew', function() {
		return this.get('traceFlags').find(traceFlag => traceFlag.get('isNew'));
	}),

	isCreatingNewTraceFlag: computed.notEmpty('newTraceFlag'),

	newDebugLevel: computed('newDebugLevelName', function() {
		return this.get('debugLevels').find(debugLevel => debugLevel.get('developerName') === this.get('newDebugLevelName'));
	}),

	debugLevelOptions: computed.mapBy('debugLevels', 'developerName'),

	actions: {
		
		async refresh() {
			try {
				await this.get('onRefresh')();
				this.get('toast').success('trace flags refreshed');
			} catch (error) {
				this.get('toast').error(error);
			}
		},

		async updateExpiration(traceFlag, numberOfHours) {
			
			const toast = this.get('toast');

			try {
				
				traceFlag.setProperties({
					startDate: moment().format(),
					expirationDate: moment().add(numberOfHours, 'hours').format()
				});

				await this.get('onUpdate')(traceFlag);
				toast.success('trace flag updated');

			} catch (error) {
				debug(`updateExpiration() error => ${error}`);
				traceFlag.rollbackAttributes();
				toast.error(error, 'Error Updating Trace Flag');
			}
		},

		async add() {
			this.get('onNewTraceFlag')();
		},

		async saveNewTraceFlag(traceFlag, numberOfHours) {
			
			const toast = this.get('toast');

			try {
				
				traceFlag.setProperties({
					startDate: moment().format(),
					expirationDate: moment().add(numberOfHours, 'hours').format(),
					debugLevelId: this.get('newDebugLevel.id')
				});
	
				await this.get('onSaveNewTraceFlag')(traceFlag);
				toast.success('trace flag created');

			} catch (error) {
				toast.error(error, 'Trace Flag Creation Failed');
			}
			
		},

		async update(id, number) {

		},

		async delete(traceFlag) {
			
			const toast = this.get('toast');

			try {
				await this.get('onDelete')(traceFlag);
				toast.success('trace flag deleted');
			} catch (error) {
				toast.error(error, 'Trace Flag Deletion Failed');
			}

		},

		async cancel(traceFlag) {
			await this.get('onCancel')(traceFlag);
		},

		setNewDebugLevelName(debugLevelName) {
			this.set('newDebugLevelName', debugLevelName);
		}
	}
});
