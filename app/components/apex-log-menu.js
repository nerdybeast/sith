import Component from '@ember/component';
import SimpleBar from 'simplebar';
import ENV from 'sith/config/environment';
import { inject as injectService } from '@ember/service';

export default Component.extend({

	io: injectService('socket-io'),
	auth: injectService('auth'),

	socket() {
		return this.get('io').socketFor(`${ENV.SITH_API_DOMAIN}/APEX_LOGS`);
	},

	init() {

		this._super(...arguments);

		const socket = this.socket();

		socket.on('connect', this.onConnect, this);
		socket.on('apex-logs-update', this.apexLogUpdate, this);
	},

	onConnect() {
		const socket = this.socket();
		socket.emit('start', this.get('auth.userInformation'));
	},

	apexLogUpdate(apexLogs) {
		this.get('onSocketUpdate')(apexLogs);
	},

	didInsertElement() {
		
		const scrollbar = new SimpleBar(document.getElementById('ApexLogMenu'), {
			scrollbarMinSize: 20
		});

		this.set('scrollbar', scrollbar);
	},

	actions: {

		setAsActiveLog(apexLogId) {
			this.get('onClick')(apexLogId);
		}

	}
});
