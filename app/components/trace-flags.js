import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { debug } from '@ember/debug';
import moment from 'moment';
import ENV from 'sith/config/environment';

export default Component.extend({

	toast: service('toast'),
	auth: service('auth'),
	io: service('socket-io'),

	//Set on component creation
	traceFlags: null,
	debugLevels: null,

	socket() {
		return this.get('io').socketFor(`${ENV.SITH_API_DOMAIN}/TRACE_FLAGS`);
	},

	init() {

		this._super(...arguments);

		const socket = this.socket();

		socket.on('connect', this.onConnect, this);
		socket.on('trace-flags-update', this.traceFlagsUpdate, this);
	},

	onConnect() {
		const socket = this.socket();
		socket.emit('start', this.get('auth.userInformation'));
	},

	traceFlagsUpdate(traceFlags) {
		this.get('onSocketUpdate')(traceFlags);
		this.get('toast').info('Trace Flags synced with Salesforce');
	},

	newDebugLevelName: null,

	newTraceFlag: computed('traceFlags.@each.isNew', function() {
		return this.get('traceFlags').find(traceFlag => traceFlag.get('isNew'));
	}),

	isCreatingNewTraceFlag: computed.notEmpty('newTraceFlag'),

	newDebugLevel: computed('newDebugLevelName', function() {
		return this.get('debugLevels').find(debugLevel => debugLevel.get('developerName') === this.get('newDebugLevelName'));
	}),

	debugLevelOptions: computed.mapBy('debugLevels', 'developerName'),

	actionErrorNotifier(title, error) {

		const toast = this.get('toast');

		//if "error" is an ember data adapter error (ex: 401 returned from the server) then it will
		//have a property "errors" that is an array of errors, if not default to whatever "error" currently is.
		const errors = error.errors || [{ error }];

		errors.forEach(x => toast.error(x.message, title));

		if(errors.find(x => x.statusCode === 401)) {
			this.get('logout')();
		}
	},

	actions: {
		
		async refresh() {
			try {
				await this.get('onRefresh')();
				this.get('toast').success('Trace Flags Refreshed');
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
				toast.success('Trace Flag Updated');

			} catch (error) {
				debug(`updateExpiration() error => ${error}`);
				traceFlag.rollbackAttributes();

				this.actionErrorNotifier('Error Updating Trace Flag', error);
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
				toast.success('Trace Flag Created');

			} catch (error) {
				this.actionErrorNotifier('Trace Flag Creation Failed', error);
			}
			
		},

		async delete(traceFlag) {
			
			const toast = this.get('toast');

			try {
				await this.get('onDelete')(traceFlag);
				toast.success('Trace Flag Deleted');
			} catch (error) {
				this.actionErrorNotifier('Trace Flag Deletion Failed', error);
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
