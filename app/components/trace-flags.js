import { notEmpty, mapBy } from '@ember/object/computed';
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
		return this.io.socketFor(`${ENV.SITH_API_DOMAIN}/TRACE_FLAGS`);
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
		this.onSocketUpdate(traceFlags);
		this.toast.info('Trace Flags synced with Salesforce');
	},

	newDebugLevelName: null,

	newTraceFlag: computed('traceFlags.@each.isNew', function() {
		return this.traceFlags.find(traceFlag => traceFlag.get('isNew'));
	}),

	isCreatingNewTraceFlag: notEmpty('newTraceFlag'),

	newDebugLevel: computed('newDebugLevelName', function() {
		return this.debugLevels.find(debugLevel => debugLevel.get('developerName') === this.newDebugLevelName);
	}),

	debugLevelOptions: mapBy('debugLevels', 'developerName'),

	actionErrorNotifier(title, error) {

		const toast = this.toast;

		//if "error" is an ember data adapter error (ex: 401 returned from the server) then it will
		//have a property "errors" that is an array of errors, if not default to whatever "error" currently is.
		const errors = error.errors || [{ error }];

		errors.forEach(x => toast.error(x.message, title));

		if(errors.find(x => x.statusCode === 401)) {
			this.logout();
		}
	},

	actions: {
		
		async refresh() {
			try {
				await this.onRefresh();
				this.toast.success('Trace Flags Refreshed');
			} catch (error) {
				this.toast.error(error);
			}
		},

		async updateExpiration(traceFlag, numberOfHours) {
			
			const toast = this.toast;

			try {
				
				traceFlag.setProperties({
					startDate: moment().format(),
					expirationDate: moment().add(numberOfHours, 'hours').format()
				});

				await this.onUpdate(traceFlag);
				toast.success('Trace Flag Updated');

			} catch (error) {
				debug(`updateExpiration() error => ${error}`);
				traceFlag.rollbackAttributes();

				this.actionErrorNotifier('Error Updating Trace Flag', error);
			}
		},

		async add() {
			this.onNewTraceFlag();
		},

		async saveNewTraceFlag(traceFlag, numberOfHours) {
			
			const toast = this.toast;

			try {
				
				traceFlag.setProperties({
					startDate: moment().format(),
					expirationDate: moment().add(numberOfHours, 'hours').format(),
					debugLevelId: this.get('newDebugLevel.id')
				});
	
				await this.onSaveNewTraceFlag(traceFlag);
				toast.success('Trace Flag Created');

			} catch (error) {
				this.actionErrorNotifier('Trace Flag Creation Failed', error);
			}
			
		},

		async delete(traceFlag) {
			
			const toast = this.toast;

			try {
				await this.onDelete(traceFlag);
				toast.success('Trace Flag Deleted');
			} catch (error) {
				this.actionErrorNotifier('Trace Flag Deletion Failed', error);
			}

		},

		async cancel(traceFlag) {
			await this.onCancel(traceFlag);
		},

		setNewDebugLevelName(debugLevelName) {
			this.set('newDebugLevelName', debugLevelName);
		}
	}
});
