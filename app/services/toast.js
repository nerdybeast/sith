import Service from '@ember/service';
import toastr from 'toastr';

const toast = (name, defaultOptions = {}) => {
	return (msg = '', title = '', options = defaultOptions) => {
		return toastr[name](msg, title, options);
	}
}

export default Service.extend({

	success: toast('success'),
	info: toast('info'),
	
	warning: toast('warning', {
		timeOut: 5000
	}),
	
	error: toast('error', {
		timeOut: 5000
	}),

	init() {
		this._super(...arguments);
		toastr.options.closeButton = true;
		toastr.options.timeOut = 3000;
		toastr.options.positionClass = 'toast-bottom-right';
	}

});
