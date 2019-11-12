import Component from '@ember/component';
import ValidateMixin from '../mixins/validate-component-arguments';

export default Component.extend(ValidateMixin, {

	sobject: null,

	init() {
		this._super(...arguments);
		this.validate('sobject-row', ['sobject']);
	},

	click() {
		this.onRowClick(this.sobject);
	}

});
