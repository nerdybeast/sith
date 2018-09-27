import Component from '@ember/component';
// import EmberError from '@ember/error';
import tippy from 'tippy';
import ValidateMixin from '../mixins/validate-component-arguments';
import { isEmpty } from '@ember/utils';

export default Component.extend(ValidateMixin, {

	tagName: 'span',
	attributeBindings: ['title'],
	classNames: ['tag'],
	classNameBindings: ['colorClass', 'isRounded:is-rounded'],

	//Expected to be passed as a parameter to this component.
	label: null,
	title: null,
	colorClass: null,
	isRounded: false,

	init() {
		this._super(...arguments);
		this.validate('meta-tag', ['label', 'colorClass']);
	},

	didInsertElement() {

		if(!isEmpty(this.get('title'))) {

			//Gives all html elements with a "title" attribute a tooltip.
			const tooltip = tippy(`#${this.get('elementId')}`, {
				arrow: true,
				duration: ['150'],
				theme: 'bulma'
			});
			
			this.set('tooltip', tooltip);
		}
	},

	willDestroyElement() {
		const tooltip = this.get('tooltip');
		if(tooltip) tooltip.destroyAll();
	}
});
