import Component from '@ember/component';
import SimpleBar from 'simplebar';

export default Component.extend({

	didInsertElement() {
		
		const scrollbar = new SimpleBar(document.getElementById('ApexLogMenu'), {
			scrollbarMinSize: 20
		});

		this.set('scrollbar', scrollbar);
	},

	actions: {

		setAsActiveLog(apexLogId) {
			this.get('onClick')(apexLogId);
		}

	}
});
