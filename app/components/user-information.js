import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

	toast: service('toast'),

	actions: {

		onCopy(item) {
			this.toast.success(`${item} copied to clipboard`);
		},

		onCopyError(item) {
			this.toast.error(`${item} failed to copy`);
		}
	}
});
