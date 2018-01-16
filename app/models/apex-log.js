import DS from 'ember-data';

export default DS.Model.extend({
	application: DS.attr('string'),
	body: DS.attr('string'),
	durationMilliseconds: DS.attr('number'),
	location: DS.attr('string'),
	logLength: DS.attr('number'),
	logUserId: DS.attr('string'),
	operation: DS.attr('string'),
	request: DS.attr('string'),
	startTime: DS.attr('string'),
	status: DS.attr('string'),
	isActive: false,
	bodyLoaded: false
});
