import DS from 'ember-data';

export default DS.Model.extend({
	actionOverrides: DS.attr(),
	activateable: DS.attr('boolean'),
	childRelationships: DS.attr(),
	compactLayoutable: DS.attr('boolean'),
	createable: DS.attr('boolean'),
	custom: DS.attr('boolean'),
	customSetting: DS.attr('boolean'),
	deletable: DS.attr('boolean'),
	deprecatedAndHidden: DS.attr('boolean'),
	feedEnabled: DS.attr('boolean'),
	fields: DS.attr(),
	hasSubtypes: DS.attr('boolean'),
	isSubtype: DS.attr('boolean'),
	keyPrefix: DS.attr('string'),
	label: DS.attr('string'),
	labelPlural: DS.attr('string'),
	layoutable: DS.attr('boolean'),
	listviewable: DS.attr(),
	lookupLayoutable: DS.attr(),
	mergeable: DS.attr('boolean'),
	mruEnabled: DS.attr('boolean'),
	name: DS.attr('string'),
	namedLayoutInfos: DS.attr(),
	queryable: DS.attr('boolean'),
	recordTypeInfos: DS.attr(),
	replicateable: DS.attr('boolean'),
	retrieveable: DS.attr('boolean'),
	searchable: DS.attr('boolean'),
	searchLayoutable: DS.attr('boolean'),
	triggerable: DS.attr('boolean'),
	undeletable: DS.attr('boolean'),
	updateable: DS.attr('boolean'),
	urls: DS.attr(),
	isTooling: DS.attr('boolean')
});
