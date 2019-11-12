import Route from '@ember/routing/route';

export default Route.extend({

	model(param) {

		const store = this.store;
		const record = store.peekRecord('sobject-metadata', param.name);

		const reload = record === null || !record.get('fields');

		return this.store.findRecord('sobject-metadata', param.name, { reload });
	}

});
