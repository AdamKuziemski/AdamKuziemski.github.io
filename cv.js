(() => {
	let darkMode = null;
	let progressBar = null;
	let tabs = null;
	let streak = null;

	window.onload = () => {
		darkMode = new DarkModeDetector();
		progressBar = new ProgressBar();
		tabs = new TabComponent();
		streak = new Streak();

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
		tabs.scroll(event);
	}
})();
