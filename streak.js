class Streak {
  constructor() {
    /** @readonly @private {Date} */
    this.firstStreakDay = new Date(2021, 3, 1);
    /** @readonly @private {HTMLParagraphElement} */
    this.streakElement = document.getElementById('streak');

    this.setDaysCount();
  }

  setDaysCount() {
    const diffTime = Math.abs(new Date() - this.firstStreakDay);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    this.streakElement.innerText = `My current Melodics streak is ${diffDays} days.`;
  }
}
