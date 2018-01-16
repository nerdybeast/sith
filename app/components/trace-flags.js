import Component from '@ember/component';
import { inject as injectService } from '@ember/service';
import { computed } from '@ember/object';
import { debug } from '@ember/debug';
import moment from 'moment';
import ENV from 'sith/config/environment';

export default Component.extend({

	toast: injectService('toast'),
	auth: injectService('auth'),
	io: injectService('socket-io'),

	//Set on component creation
	traceFlags: null,
	debugLevels: null,

	socket() {
		return this.get('io').socketFor(`${ENV.SITH_API_DOMAIN}/trace-flag`);
	},

	init() {
		this._super(...arguments);

		const socket = this.socket();

		socket.on('connect', this.onConnect, this);
	},

	onConnect() {
		const socket = this.socket();
		socket.emit('handshake', this.get('auth.userInformation'));
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
