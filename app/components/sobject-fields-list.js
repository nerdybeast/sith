import Component from '@ember/component';
import { computed } from '@ember/object'
import { isEmpty } from '@ember/utils';
import { ColorClass } from '../utils/constants';
import ValidateMixin from '../mixins/validate-component-arguments';

export default Component.extend(ValidateMixin, {

	fields: null,

	tagName: 'table',
	classNames: ['table', 'is-narrow', 'is-fullwidth', 'is-hoverable', 'is-marginless'],

	init() {
		this._super(...arguments);
		this.validate('sobject-fields-list', ['fields']);
	},

	sortedFields: computed('addedFieldMetaTagConfig', function() {
		return this.get('addedFieldMetaTagConfig').sortBy('name');
	}),

	addedFieldMetaTagConfig: computed('fields.[]', function() {

		const fields = this.get('fields') || [];

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
