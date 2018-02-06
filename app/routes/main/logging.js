import Route from '@ember/routing/route';
import { all } from 'rsvp';

export default Route.extend({
	
	async model() {
		
		const [ logs, traceFlags ] = await all([
			this.get('store').findAll('apex-log'),
			this.get('store').findAll('trace-flag')
		]);

		return { logs, traceFlags };
	},
	
	setupController(controller, model) {

		this._super(controller, model);

		const sortedLogs = model.logs.sortBy('startTime').reverseObjects();
		const activeLog = sortedLogs.findBy('isActive', true);

		if(sortedLogs.length > 0 && !activeLog) {
			sortedLogs[0].set('isActive', true);
		}
		
		controller.set('model.logs', sortedLogs);
	},

	actions: {
		error(error) {
			const mainError = error.errors[0];
			if(mainError.statusCode === 401) return true;
		}
	}
});
