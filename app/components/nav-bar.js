import Component from '@ember/component';

export default Component.extend({
	
	showUserDropdown: false,
	showLogoutModal: false,

	actions: {
		confirmLogout() {
			this.set('showLogoutModal', true);
		},
		cancelLogout() {
			this.set('showLogoutModal', false);
		},
		logout() {
			this.get('onLogout')();
		},
		toggleUserDropdown() {
			this.toggleProperty('showUserDropdown');
		}
	}
});
