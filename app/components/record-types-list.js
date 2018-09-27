import Component from '@ember/component';
//import { computed } from '@ember/object'
import ValidateMixin from '../mixins/validate-component-arguments';

export default Component.extend(ValidateMixin, {

	recordTypes: null,

	tagName: 'table',
	classNames: ['table', 'is-narrow', 'is-fullwidth', 'is-hoverable', 'is-marginless'],

	init() {
		this._super(...arguments);
		this.validate('record-types-list', ['recordTypes']);
	}

});
