module.exports = function(env) {
	return {
		clientAllowedKeys: [
			'AUTH0_DOMAIN',
			'AUTH0_CLIENT_ID',
			'AUTH0_REDIRECT_URL',
			'AUTH0_AUDIENCE',
			'SITH_API_DOMAIN'
		]
	};
};