import Component from '@ember/component';

export default Component.extend({

	traceFlag: null,

	actions: {
		async clicked(numberOfHours) {
			this.set(`hourButtonLoading${numberOfHours}`, true);
			await this.onClick(this.traceFlag, numberOfHours);
			if(this.isDestroyed) return;
			this.set(`hourButtonLoading${numberOfHours}`, false);
		}
	}
});
