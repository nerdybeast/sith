import Component from '@ember/component';
import SimpleBar from 'simple-bar';
//import { observer } from '@ember/object';

export default Component.extend({

	didInsertElement() {
		const scrollbar = new SimpleBar(document.getElementById('LogBodyWrapper'));
		this.set('scrollbar', scrollbar);
	}

});
