import DS from 'ember-data';

export default DS.Model.extend({
	apexCode: DS.attr('string'),
	apexProfiling: DS.attr('string'),
	callout: DS.attr('string'),
	database: DS.attr('string'),
	developerName: DS.attr('string'),
	Language: DS.attr('string'),
	masterLabel: DS.attr('string'),
	system: DS.attr('string'),
	validation: DS.attr('string'),
	visualforce: DS.attr('string'),
	workflow: DS.attr('string')
});
