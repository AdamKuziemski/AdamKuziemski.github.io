const SAVED_DARK_MODE_SETTING = localStorage.getItem('darkMode');

class DarkModeDetector {
  /** @private {boolean} */
  #isDarkMode = SAVED_DARK_MODE_SETTING !== null ?
    SAVED_DARK_MODE_SETTING === 'true' :
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  /** @private {HTMLImageElement} */
  #toggle = document.getElementById('dark-mode-toggle');
  /** @private {HTMLDocumentElement} */
  #rootElement = document.getElementsByTagName('html')[0];

  constructor() {
    this.applyDarkModeSettings();

    if (!this.#toggle) {
      return;
    }

    this.#toggle.addEventListener('click', () => {
      this.toggleDarkMode();
      this.applyDarkModeSettings();
    });
  }

  /**
   * Applies dark mode class to document root.
   * This changes css variable values to dark mode.
   */
  applyDarkModeSettings() {
    if (this.#isDarkMode) {
      this.#rootElement.classList.add('dark-mode');
    } else {
      this.#rootElement.classList.remove('dark-mode');
    }
  }

  /**
   * Toggles dark mode settings on or off and saves them into local storage.
   * */
  toggleDarkMode() {
    this.#isDarkMode = !this.#isDarkMode;
    localStorage.setItem('darkMode', '' + this.#isDarkMode);
  }

  /**
   * Removes dark mode from the site for printing.
   */
  printInNormalMode() {
    if (this.#isDarkMode) {
      this.#rootElement.classList.remove('dark-mode');
    }
  }
}
