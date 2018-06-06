import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { ColorClass } from '../../utils/constants';

export default Controller.extend({

	sortedFields: computed('addedMetaTagConfig', function() {
		return this.get('addedMetaTagConfig').sortBy('name');
	}),

	addedMetaTagConfig: computed('model.fields.[]', function() {

		const fields = this.get('model.fields') || [];

		fields.forEach(field => {

			if(isEmpty(field.metaTagConfig)) {
				field.metaTagConfig = {
					label: field.custom ? 'C' : 'S',
					title: field.custom ? 'Custom Field' : 'Standard Field',
					colorClass: field.custom ? ColorClass.WARNING : ColorClass.SUCCESS
				};
			}

		});

		return fields;
	})

});
