import Component from '@ember/component';
// import EmberError from '@ember/error';
import ValidateMixin from '../mixins/validate-component-arguments';

export default Component.extend(ValidateMixin, {

	sobject: null,

	init() {

		this._super(...arguments);

		// if(!this.get('sobject')) throw new EmberError(`You must set the "sobject" parameter to when rendering {{sobject-row sobject=<some-sobject>}}`);
		this.validate('sobject-row', ['sobject']);
	},

	click() {
		alert(this.get('sobject.label'));
		this.get('onRowClick')(this.get('sobject'));
	}

});
