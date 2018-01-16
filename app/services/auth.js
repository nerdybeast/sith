import Ember from 'ember';
import Service from '@ember/service';
import ENV from 'sith/config/environment';

export default Service.extend({

	ajax: Ember.inject.service('ajax'),

	auth0: Ember.computed(function() {
		
		//The "auth0" var is global, it was imported in ember-cli-build.js
		return new auth0.WebAuth({
			domain: ENV.AUTH0_DOMAIN,
			clientID: ENV.AUTH0_CLIENT_ID,
			redirectUri: ENV.AUTH0_REDIRECT_URL,
			audience: ENV.AUTH0_AUDIENCE,
			responseType: 'token id_token',
			scope: 'openid'
		});

	}),

	login() {
		this.get('auth0').authorize();
	},

	handleAuthentication() {
		return new Ember.RSVP.Promise((resolve, reject) => {
			this.get('auth0').parseHash((error, authResult) => {
				
				//Will be true if the current url does not have a hash to parse
				if(!error && !authResult) {
					return resolve();
				}

				if(error) {
					const e = new Error(`Error: ${error.error} - ${error.errorDescription}`);
					e.name = 'AUTH0_PARSE_HASH_ERROR';
					return reject(e);
				}

				if(!authResult || !authResult.accessToken || !authResult.idToken) {
					return reject('Auth failed');
				}

				this.setSession(authResult);
				return resolve(authResult);
			})
		});
	},

	//Volatile property meaning the value won't be cached, fresh data pull every time.
	isAuthenticated: Ember.computed(function() {
		return Ember.isPresent(this.getSession().access_token) && !this.isExpired();
	}).volatile(),

	getSession() {
		return {
			access_token: localStorage.getItem('access_token'),
			id_token: localStorage.getItem('id_token'),
			expires_at: localStorage.getItem('expires_at')
		};
	},

	setSession(authResult) {
		// Set the time that the access token will expire at
		let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
		localStorage.setItem('access_token', authResult.accessToken);
		localStorage.setItem('id_token', authResult.idToken);
		localStorage.setItem('expires_at', expiresAt);
	},

	logout() {
		// Clear access token and ID token from local storage
		localStorage.removeItem('access_token');
		localStorage.removeItem('id_token');
		localStorage.removeItem('expires_at');
		sessionStorage.removeItem('profile');
	},
	
	isExpired() {
		// Check whether the current time is past the access token's expiry time
		let expiresAt = this.getSession().expires_at;
		return new Date().getTime() >= expiresAt;
	},

	setProfile(profile) {
		sessionStorage.setItem('profile', JSON.stringify(profile));
	},

	async getProfile() {

		const profileAsString = sessionStorage.getItem('profile');
		if(profileAsString) return JSON.parse(profileAsString);

		const token = this.getSession().id_token;

		const profile = await this.get('ajax').post(`${ENV.domain}/api/user/profile`, {
			data: { token }
		});

		this.setProfile(profile);
		return profile;
	},

	userInformation: Ember.computed(function() {
		
		const profile = JSON.parse(sessionStorage.getItem('profile'));
		const customDomain = profile.urls.custom_domain;
		const enterprise = profile.urls.enterprise;

		const sessionId = profile.identities[0].access_token;
		const userId = profile.identities[0].user_id;
		const instanceUrl = customDomain || enterprise.substring(0, enterprise.indexOf('/services'));
		const organizationId = profile.organization_id;

		return {
			sessionId,
			userId,
			instanceUrl,
			organizationId,
			email: profile.email
		};

	}).volatile()
});