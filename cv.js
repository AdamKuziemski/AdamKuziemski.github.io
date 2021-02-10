(() => {
	let darkMode = null;
	let progressBar = null;
	let tabs = null;

	window.onload = () => {
		darkMode = new DarkModeDetector();
		progressBar = new ProgressBar();
		tabs = new TabComponent();

		document.addEventListener('keyup', checkKonamiCode);
	};

	window.onresize = () => {
		tabs.displayTabs();
	}

	window.onbeforeprint = () => {
		tabs.linearizeTabs();
		progressBar.setLevelAndExperience();
		darkMode.printInNormalMode();
	}

	window.onafterprint = () => {
		tabs.displayTabs();
		darkMode.applyDarkModeSettings();
	}
})();
