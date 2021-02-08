class DarkModeDetector {
  /** @param {boolean} noToggle specifies whether the page contains a dark mode toggle */
  constructor(noToggle) {
    const savedDarkModeSetting = localStorage.getItem('darkMode');

    /** @private {boolean} */
    this.isDarkMode = savedDarkModeSetting !== null ?
      savedDarkModeSetting === 'true' :
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    /** @private {HTMLImageElement} */
    this.toggle = document.getElementById('dark-mode-toggle');
    /** @private {HTMLDocumentElement} */
    this.rootElement = document.getElementsByTagName('html')[0];

    this.applyDarkModeSettings();

    if (noToggle) {
      return;
    }

    this.toggle.addEventListener('click', () => {
      this.toggleDarkMode();
      this.applyDarkModeSettings();
    });
  }

  /**
   * Applies dark mode class to document root.
   * This changes css variable values to dark mode.
   */
  applyDarkModeSettings() {
    if (this.isDarkMode) {
      this.rootElement.classList.add('dark-mode');
    } else {
      this.rootElement.classList.remove('dark-mode');
    }
  }

  /**
   * Toggles dark mode settings on or off and saves them into local storage.
   * */
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', '' + this.isDarkMode);
  }

  /**
   * Removes dark mode from the site for printing.
   */
  printInNormalMode() {
    if (this.isDarkMode) {
      this.rootElement.classList.remove('dark-mode');
    }
  }
}
