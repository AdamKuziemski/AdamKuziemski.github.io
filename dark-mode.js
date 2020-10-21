class DarkModeDetector {
  constructor() {
    const savedDarkModeSetting = localStorage.getItem('darkMode');

    /** @private {boolean} */
    this.isDarkMode = savedDarkModeSetting !== null ?
      savedDarkModeSetting === 'true' :
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    /** @private {HTMLImageElement} */
    this.toggle = document.getElementById('dark-mode-toggle');
    /** @private {HTMLDocumentElement} */
    this.rootElement = document.getElementsByTagName('html')[0];

    this.toggle.addEventListener('click', () => {
      this.toggleDarkMode();
      this.applyDarkModeSettings();
    });

    this.applyDarkModeSettings();
  }

  applyDarkModeSettings() {
    if (this.isDarkMode) {
      this.rootElement.classList.add('dark-mode');
    } else {
      this.rootElement.classList.remove('dark-mode');
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', '' + this.isDarkMode);
  }

  printInNormalMode() {
    if (this.isDarkMode) {
      this.rootElement.classList.remove('dark-mode');
    }
  }
}
