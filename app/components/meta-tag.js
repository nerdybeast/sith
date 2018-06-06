import Component from '@ember/component';
// import EmberError from '@ember/error';
import tippy from 'tippy';
import ValidateMixin from '../mixins/validate-component-arguments';

export default Component.extend(ValidateMixin, {

	tagName: 'span',
	attributeBindings: ['title'],
	classNames: ['tag'],
	classNameBindings: ['colorClass'],

	//Expected to be passed as a parameter to this component.
	label: null,
	title: null,
	colorClass: null,

	init() {
		
		this._super(...arguments);

		// const { label, title, colorClass } = this.getProperties('label', 'title', 'colorClass');
		// const errors = [];

		// if(!label) errors.push('label');
		// if(!title) errors.push('title');
		// if(!colorClass) errors.push('colorClass');

		// if(errors.length > 0) {
		// 	throw new EmberError(`You must set the following properties when rendering the {{meta-tag ...}} component: ${errors.join(', ')}`);
		// }

		this.validate('meta-tag', ['label', 'title', 'colorClass']);
	},

	didInsertElement() {
		
		//Gives all html elements with a "title" attribute a tooltip.
		const tooltip = tippy(`#${this.get('elementId')}`, {
			arrow: true,
			duration: ['150'],
			theme: 'bulma'
		});

		this.set('tooltip', tooltip);
	},

	willDestroyElement() {
		const tooltip = this.get('tooltip');
		if(tooltip) tooltip.destroyAll();
	}
});
