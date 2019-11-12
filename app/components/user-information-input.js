import Component from '@ember/component';
import tippy from 'tippy';

export default Component.extend({

	didInsertElement() {
		
		//Gives all html elements with a "title" attribute a tooltip.
		const tooltips = tippy('[title]', {
			arrow: true,
			duration: ['150'],
			theme: 'bulma'
		});

		this.set('tooltips', tooltips);
	},

	willDestroyElement() {
		this.tooltips.destroyAll();
	}
});
