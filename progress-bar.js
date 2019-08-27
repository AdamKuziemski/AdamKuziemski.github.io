class ProgressBar {
    constructor() {
        /** @private {Date} */ this.birthday = new Date('12 Jan 1991 13:05');
        /** @private {HTMLDivElement} */ this.bar = document.getElementById('progress-bar');
        /** @private {HTMLDivElement} */ this.fill = document.getElementById('fill');

        this.fill.style.width = '0%';

		setInterval(() => this.setLevelAndExperience(), 1000);
    }

	setLevelAndExperience() {
		const today = new Date().getTime();

		const age = new Date(today - this.birthday.getTime()).getUTCFullYear() - 1970;
		const progress = 100 - ((this.getNextBirthday(age) - today) / (36000 * 24)) / 365;

		this.bar.dataset.label = `Level ${age} programmer`;
		this.fill.style.width = progress.toFixed(2) + '%';
    };
    
    getNextBirthday(age) {
        return new Date(
            this.birthday.getUTCFullYear() + age + 1,
            this.birthday.getUTCMonth(), this.birthday.getUTCDate(),
            this.birthday.getUTCHours(), this.birthday.getUTCMinutes()
        ).getTime();
    }
}