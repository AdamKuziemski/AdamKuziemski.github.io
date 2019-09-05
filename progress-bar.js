class ProgressBar {
    constructor() {
        /** @readonly @private {Date} */ this.birthday = new Date('12 Jan 1991 13:05');
        /** @private {HTMLDivElement} */ this.bar = document.getElementById('progress-bar');
        /** @private {HTMLDivElement} */ this.fill = document.getElementById('fill');

        this.fill.style.width = '0%';
        this.setLevel();

		setInterval(() => this.setLevelAndExperience(), 1000);
    }

    /**
     * sets age/level and adjusts the experience bar
     */
	setLevelAndExperience() {
		const today = new Date().getTime();
		const age = this.calculateAge(today);

		this.setLevel(age);
		this.setProgressBarFill(this.calculateProgressTowardsNextLevel(age, today));
    }

    /**
     * @private
     * Calculates age based on a point in time
     * @param {number} pointInTime at which the age is calculated; defaults to new Date().getTime()
     * @returns {number} of years
     */
    calculateAge(pointInTime = new Date().getTime()) {
        return new Date(pointInTime - this.birthday.getTime()).getUTCFullYear() - 1970;
    }

    /**
     * @private
     * Sets age in the progress bar
     * @param {number} age to set; defaults to calculateAge()
     */
    setLevel(age = this.calculateAge()) {
        this.bar.dataset.label = `Level ${age} programmer`;
    }

    /**
     * @private
     * Sets progress bar's fill width
     * @param {number} percent of the progress bar; caps between 0 and 100 inclusive
     */
    setProgressBarFill(percent) {
        this.fill.style.width = Math.min(Math.max(percent, 0), 100) + '%';
    }

    /**
     * @private
     * Calculates % towards next birthday, based on current age
     * @param {number} age to calculate next birthday
     * @param {number} pointInTime at which the progress is based
     * @returns percent of completion of the current level
     */
    calculateProgressTowardsNextLevel(age, pointInTime) {
        return (100 - ((this.getNextBirthday(age) - pointInTime) / (36000 * 24)) / 365).toFixed(2);
    }

    /**
     * @private
     * Calculates next birthday's Unix time
     * @param {number} age 
     * @returns {number} Unix time of the next birthday
     */
    getNextBirthday(age) {
        return new Date(
            this.birthday.getUTCFullYear() + age + 1,
            this.birthday.getUTCMonth(), this.birthday.getUTCDate(),
            this.birthday.getUTCHours(), this.birthday.getUTCMinutes()
        ).getTime();
    }
}