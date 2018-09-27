import Component from '@ember/component';
import ValidateMixin from '../mixins/validate-component-arguments';
import { equal } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend(ValidateMixin, {

	//Expected to be an sobject field object
	field: null,
	
	//Expected to be "apiDataType" or "metadata.type"
	controllingField: null,

	init() {
		this._super(...arguments);
		this.validate('sobject-field-data-type', ['field', 'controllingField']);
	},

	isApiDataType: equal('controllingField', 'apiDataType'),

	fieldType: computed('field', 'isApiDataType', function() {
		const { field, isApiDataType } = this.getProperties('field', 'isApiDataType');
		return isApiDataType ? field.apiDataType : field.metadata.type;
	}),

	isLookup: computed('fieldType', function() {
		return ['MasterDetail', 'Lookup'].includes(this.get('fieldType'));
	}),

	isPicklist: computed('fieldType', function() {
		return ['Picklist', 'MultiselectPicklist'].includes(this.get('fieldType'));
	}),

	isNumber: computed('fieldType', function() {
		return ['double', 'decimal', 'Number', 'Currency'].includes(this.get('fieldType'));
	}),

	referenceTo: computed('field.referenceTo.[]', function() {
		return this.get('field.referenceTo')[0];
	})
});
