import Controller from '@ember/controller';
import { inject as injectService } from '@ember/service';
import moment from 'moment';

export default Controller.extend({

	auth: injectService('auth'),

	init() {

		this._super(...arguments);

		const timer = setInterval(() => {
			
			const traceFlags = this.get('model.traceFlags');
			if(!traceFlags) return;

			const now = moment();
			
			traceFlags.forEach(traceFlag => {
				const expirationDate = moment(traceFlag.get('expirationDate'));
				traceFlag.set('isExpired', expirationDate.isSameOrBefore(now));
			});
			
		}, 1000);

		this.set('traceFlagTimer', timer);
	},

	willDestroy() {
		this._super(...arguments);
		clearInterval(this.get('traceFlagTimer'));
	},

	actions: {

		logout() {
			this.get('auth').logout();
			this.transitionToRoute('welcome');
		}

	}

});
