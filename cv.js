(() => {
	let darkMode = null;
	let progressBar = null;
	let tabs = null;

	window.onload = () => {
		darkMode = new DarkModeDetector();
		progressBar = new ProgressBar();
		tabs = new TabComponent();

		placeEggs();
	};

	window.onresize = () => {
		tabs.displayTabs();
	}

	window.onbeforeprint = () => {
		progressBar.setLevelAndExperience();
		darkMode.printInNormalMode();
	}

	window.onafterprint = () => {
		tabs.displayTabs();
		darkMode.applyDarkModeSettings();
	}

	window.onwheel = (event) => {
		if (event.target.tagName !== 'HTML') {
      return;
    }

		tabs.scroll(event);
	}
})();
