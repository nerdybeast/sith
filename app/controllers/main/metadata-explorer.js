import Controller from '@ember/controller';

export default Controller.extend({

	actions: {

		goToSobjectView(sobject) {
			this.transitionToRoute(`main.sobject`, sobject.name);
		},

		async searchForMetadata(searchTerm) {

			const result = await this.get('store').query('sobject-metadata', {
				q: searchTerm
			});

			this.set('model.sobjects', result);
		}
	}

});
