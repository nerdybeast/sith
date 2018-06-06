import Component from '@ember/component';
import { computed } from '@ember/object';
import tippy from 'tippy';

export default Component.extend({
	
	icon: null,
	title: null,

	isClickable: true,
	animateOnAction: true,
	clickTriggered: false,
	animationIcon: null,
	
	/**
	 * If supplied, the expected value is a bulma color class: 'success', 'warning', 'light-grey', ect...
	 */
	colorClass: null,
	
	animationColorClass: null,
	animationSpeedClass: 'fa-spin',

	tagName: 'span',
	classNames: ['icon'],
	
	classNameBindings: [
		'isClickable:clickable',
		'shouldAnimate',
		'colorClassToDisplay'
	],

	attributeBindings: ['title'],

	iconToDisplay: computed('icon', 'animationIcon', 'clickTriggered', function() {
		const { icon, animationIcon, clickTriggered } = this.getProperties('icon', 'animationIcon', 'clickTriggered');
		if(!animationIcon) return icon;
		return clickTriggered ? animationIcon : icon;
	}),

	iconClass: computed('iconToDisplay', function() {
		return `fa fa-${this.get('iconToDisplay')}`;
	}),

	colorClassToDisplay: computed('colorClass', 'animationColorClass', 'clickTriggered', function() {
		const { colorClass, animationColorClass, clickTriggered } = this.getProperties('colorClass', 'animationColorClass', 'clickTriggered');
		if(!colorClass && !animationColorClass) return '';
		if(!animationColorClass) return `has-text-${colorClass}`;
		const result = clickTriggered ? animationColorClass : colorClass;
		return `has-text-${result}`;
	}),

	shouldAnimate: computed('animateOnAction', 'clickTriggered', function() {
		const isAnimated = this.get('animateOnAction') && this.get('clickTriggered');
		return isAnimated ? this.get('animationSpeedClass') : '';
	}),

	didInsertElement() {
		
		if(this.get('title')) {

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
	},

	//Default component event handler: https://guides.emberjs.com/v2.18.0/components/handling-events/#toc_event-names
	async click() {

		this.set('clickTriggered', true);

		try {
			await this.get('onClick')();
		} catch (error) {
			//
		}
		
		if(!this.get('isDestroyed')) {
			this.set('clickTriggered', false);
		}
	}
});
