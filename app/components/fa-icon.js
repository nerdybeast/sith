import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	
	isClickable: true,
	animateOnAction: true,
	clickTriggered: false,
	animationIcon: null,
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
