import DS from 'ember-data';

export default DS.Model.extend({
	label: DS.attr(),
	url: DS.attr(),
	version: DS.attr()
});
