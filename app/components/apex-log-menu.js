import Component from '@ember/component';
import SimpleBar from 'simple-bar';

export default Component.extend({

	didInsertElement() {
		const scrollbar = new SimpleBar(document.getElementById('ApexLogMenu'));
		this.set('scrollbar', scrollbar);
	},

	actions: {

		setAsActiveLog(apexLogId) {
			this.get('onClick')(apexLogId);
		}

	}
});
