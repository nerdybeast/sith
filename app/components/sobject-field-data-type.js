import Component from '@ember/component';
import ValidateMixin from '../mixins/validate-component-arguments';
import { equal } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend(ValidateMixin, {

	//Expected to be an sobject field object
	field: null,

	init() {
		this._super(...arguments);
		this.validate('sobject-field-data-type', ['field']);
	},

	isReference: equal('field.type', 'reference'),
	isNumber: equal('field.type', 'double'),
	isPicklist: equal('field.type', 'picklist'),

	referenceTo: computed('field.referenceTo.[]', function() {
		return this.get('field.referenceTo')[0];
	}),

	picklistOptions: computed('field.picklistValues.[]', function() {
		return this.get('field.picklistValues').map(option => {
			if(!option.active) option.label += ' (inactive)';
			if(option.defaultValue) option.label += ' (default)';
			return option;
		}).sortBy('label');
	})
});
