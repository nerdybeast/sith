import Component from '@ember/component';
import SimpleBar from 'simplebar';
import { isBlank } from '@ember/utils';

export default Component.extend({

	filterMatch: null,
	filteredSobjects: null,

	init() {

		this._super(...arguments);

		if(this.get('filteredSobjects') === null) {
			this.set('filteredSobjects', this.get('sobjects'));
		}
	},

	didInsertElement() {
		
		new SimpleBar(document.getElementById('SobjectList'), {
			scrollbarMinSize: 30
		});

	},

	actions: {

		setAsActiveSobject(sobjectId) {
			this.get('onClick')(sobjectId);
		},

		filterList() {

			const filterMatch = (this.get('filterMatch') || '').trim().toLowerCase();
			const sobjects = this.get('sobjects');

			if(isBlank(filterMatch)) {
				this.set('filteredSobjects', sobjects);
				return;
			}
			
			const matchingObjects = sobjects.filter(sobject => {
				const { name, label } = sobject.getProperties('name', 'label');
				return name.toLowerCase().includes(filterMatch) || label.toLowerCase().includes(filterMatch);
			})

			this.set('filteredSobjects', matchingObjects);
		}

	}

});
