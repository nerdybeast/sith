import DS from 'ember-data';

export default DS.Model.extend({
	apexCode: DS.attr('string'),
	apexProfiling: DS.attr('string'),
	callout: DS.attr('string'),
	database: DS.attr('string'),
	debugLevel: DS.belongsTo('debug-level'),
	debugLevelId: DS.attr('string'),
	expirationDate: DS.attr('string'),
	logType: DS.attr('string'),
	startDate: DS.attr('string'),
	system: DS.attr('string'),
	tracedEntityId: DS.attr('string'),
	validation: DS.attr('string'),
	visualforce: DS.attr('string'),
	workflow: DS.attr('string'),
	isExpired: false
});
