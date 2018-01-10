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
	actions: {
		error(error) {
			const mainError = error.errors[0];
			if(mainError.statusCode === 401) return true;
		}
	}
});
