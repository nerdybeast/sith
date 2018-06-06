import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

	activeSobject: computed('model.sobjects.@each.isActive', function() {
		return this.get('model.sobjects').find(sobject => sobject.get('isActive'));
	}),

	selectStarQuery: computed('activeSobject.fields.[]', function() {
		
		const activeSobject = this.get('activeSobject');
		if(!activeSobject) return;

		const fields = activeSobject.get('fields');
		if(!fields) return;

		const fieldNames = fields.map(field => field.name).join(', ');

		return `Select ${fieldNames} From ${activeSobject.get('name')}`;
	}),

	actions: {
		
		async setActiveSobject(sobjectId) {

			//if(sobjectId === this.get('activeSobject.id')) return;

			let sobject = this.get('model.sobjects').find(x => x.get('id') === sobjectId);

			this.get('model.sobjects').forEach(x => x.set('isActive', false));
			sobject.set('isActive', true);

			if(sobject.get('fields')) return;

			this.set('loadingSobjectFields', true);

			sobject = await this.get('store').findRecord('sobject-metadata', sobjectId, {
				reload: true
			});

			this.set('loadingSobjectFields', false);
		},

		setActiveSobjectField(fieldName) {
			
			const fields = this.get('activeSobject.fields');
			let field = fields.find(x => x.name === fieldName);

			fields.forEach(x => x.isActive = false);

			field.isActive = true;
		},

		selectStarCopy() {

		},

		selectStarCopyError() {

		},

		goToSobjectView(sobject) {
			this.transitionToRoute(`main.sobject`, sobject.name);
		}
	}

});
