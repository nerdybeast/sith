import Component from '@ember/component';
// import EmberError from '@ember/error';
import { computed } from '@ember/object';
import ValidateMixin from '../mixins/validate-component-arguments';

export default Component.extend(ValidateMixin, {

	//Expected to be passed as a parameter to this component.
	sobject: null,

	tagProperties: computed('sobject', function() {
		
		const sobject = this.get('sobject');
		
		if(sobject.isTooling) {
			return {
				label: 'T',
				className: 'is-link',
				title: 'Tooling Object'
			};
		}

		if(sobject.customSetting) {
			return {
				label: 'C',
				className: 'is-warning',
				title: 'Custom Setting'
			};
		}
		
		if(sobject.custom) {
			return {
				label: 'C',
				className: 'is-info',
				title: 'Custom Object'
			};
		}
		
		return {
			label: 'S',
			className: 'is-success',
			title: 'Standard Object'
		};
	}),

	title: computed('tagProperties', function() {
		return this.get('tagProperties').title;
	}),

	init() {
		this._super(...arguments);
		// if(!this.get('sobject')) throw new EmberError(`You must set the "sobject" parameter to when rendering {{sobject-meta-tag sobject=<some-sobject>}}`);
		this.validate('sobject-meta-tag', ['sobject']);
	}
});
