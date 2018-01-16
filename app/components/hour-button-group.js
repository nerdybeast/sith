import Component from '@ember/component';

export default Component.extend({

	traceFlag: null,

	actions: {
		async clicked(numberOfHours) {
			this.set(`hourButtonLoading${numberOfHours}`, true);
			await this.get('onClick')(this.get('traceFlag'), numberOfHours);
			if(this.get('isDestroyed')) return;
			this.set(`hourButtonLoading${numberOfHours}`, false);
		}
	}
});
