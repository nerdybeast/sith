import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

	namespace: 'api/org',
	
	//"type" param here will be "org-version"
	pathForType(type) {
		
		//This will give us a url of ".../api/org/versions".
		return 'versions';
	}
});
