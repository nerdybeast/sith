import Component from '@ember/component';
import SimpleBar from 'simplebar';

export default Component.extend({

	didInsertElement() {
		
		new SimpleBar(document.getElementById('SobjectList'), {
			scrollbarMinSize: 30
		});

	},

	actions: {

		setAsActiveSobject(sobjectId) {
			this.get('onClick')(sobjectId);
		}

	}

});
