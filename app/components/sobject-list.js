import Component from '@ember/component';
// import SimpleBar from 'simplebar';
import { isBlank } from '@ember/utils';
import { debounce } from '@ember/runloop';
import { computed } from '@ember/object';

export default Component.extend({

	filterMatch: null,
	filteredSobjects: null,

	//Filtering sobjects is done on key-up and is an expensive operation in large orgs.
	//This will hold the user's previous search so that we can compare it against the current search.
	lastFilterMatch: null,

	searchHasChanged: computed('filterMatch', 'lastFilterMatch', function() {
		return this.get('filterMatch') !== this.get('lastFilterMatch');
	}),

	init() {

		this._super(...arguments);

		if(this.get('filteredSobjects') === null) {
			this.set('filteredSobjects', this.get('sobjects'));
		}
	},

	didInsertElement() {
		
		// new SimpleBar(document.getElementById('SobjectList'), {
		// 	scrollbarMinSize: 30
		// });

	},

	_filterList() {

		//Prevents executing this function if the user's search term hasn't changed.
		if(!this.get('searchHasChanged')) return;

		const filterMatch = (this.get('filterMatch') || '').trim().toLowerCase();
		const sobjects = this.get('sobjects');

		this.set('lastFilterMatch', filterMatch);

		if(isBlank(filterMatch)) {
			this.set('filteredSobjects', sobjects);
			return;
		}
		
		const matchingObjects = sobjects.filter(sobject => {
			const { name, label } = sobject.getProperties('name', 'label');
			return name.toLowerCase().includes(filterMatch) || label.toLowerCase().includes(filterMatch);
		})

		this.set('filteredSobjects', matchingObjects);
	},

	actions: {

		setAsActiveSobject(sobjectId) {
			this.get('onClick')(sobjectId);
		},

		filterList() {
			debounce(this, this._filterList, 250);
		}

	}

});
