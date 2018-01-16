import Service from '@ember/service';
//import { computed } from '@ember/object';

const toast = (name) => {
	return (msg = '', title = '', options = {}) => {
		return toastr[name](msg, title, options);
	}
}

export default Service.extend({

	success: toast('success'),
	info: toast('info'),
	warning: toast('warning'),
	error: toast('error'),

	init() {
		this._super(...arguments);
		toastr.options.closeButton = true;
		toastr.options.timeOut = 3000;
		toastr.options.positionClass = 'toast-bottom-right';
	}

});
