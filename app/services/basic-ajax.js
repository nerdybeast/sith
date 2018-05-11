import Service, { inject as service } from '@ember/service';
import ENV from 'sith/config/environment';

export default Service.extend({

	ajax: service('ajax'),
	auth: service('auth'),

	async getLogTypes() {
		const logTypes = await this.get('ajax').request(`${ENV.SITH_API_DOMAIN}/api/metadata/log-types`);
		return logTypes;
	},

	async describeSobject(sobjectName) {
		return await this.get('ajax').request(`${ENV.SITH_API_DOMAIN}/api/metadata/describe/${sobjectName}`);
	},

	async searchByIdentifier(identifier) {
		
		const headers = this.get('auth.requestHeaders');

		return await this.get('ajax').request(`${ENV.SITH_API_DOMAIN}/api/metadata/search/identifier?q=${identifier}`, {
			headers
		});
	}
});
