import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

	namespace: 'api/metadata/describe',
	
	//"type" param here will be "sobject-metadata-base"
	pathForType(/*type*/) {
		
		//This will give us a url of ".../api/metadata/describe/global".
		return 'global';
	}
});