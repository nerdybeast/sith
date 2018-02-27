import Service, { inject } from '@ember/service';
import ENV from 'sith/config/environment';

export default Service.extend({

	ajax: inject('ajax'),

	async getLogTypes() {
		const logTypes = await this.get('ajax').request(`${ENV.SITH_API_DOMAIN}/api/metadata/log-types`);
		return logTypes;
	},

	async describeSobject(sobjectName) {
		return await this.get('ajax').request(`${ENV.SITH_API_DOMAIN}/api/metadata/describe/${sobjectName}`);
	}

});
