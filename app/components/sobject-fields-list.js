import Component from '@ember/component';
import { computed } from '@ember/object'
import SimpleBar from 'simplebar';

export default Component.extend({

	fields: null,

	sortedFields: computed('fields.[]', function() {
		const fields = this.get('fields') || [];
		return fields.sortBy('name');
	}),

	didInsertElement() {
		
		new SimpleBar(document.getElementById('SobjectFieldList'), {
			scrollbarMinSize: 30
		});

	},

	actions: {

		setAsActiveField(fieldName) {
			this.get('onClick')(fieldName);
		}

	}

});
