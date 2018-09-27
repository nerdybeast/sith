import Component from '@ember/component';
import ValidateMixin from '../mixins/validate-component-arguments';
import { computed } from '@ember/object';

export default Component.extend(ValidateMixin, {

	feature: null,

	init() {
		this._super(...arguments);
		//this.validate('has-feature', ['feature']);
	},

	icon: computed('feature', function() {
		return this.get('feature') ? 'check' : 'times';
	}),

	colorClass: computed('feature', function() {
		return this.get('feature') ? 'success' : 'danger';
	})
});
