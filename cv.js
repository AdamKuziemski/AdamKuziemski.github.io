(() => {
	let darkMode = null;
	let progressBar = null;
	let tabs = null;
	let projectDetails = null;

	window.onload = () => {
		darkMode = new DarkModeDetector();
		progressBar = new ProgressBar();
		tabs = new TabComponent();
		projectDetails = new ProjectDetailsComponent();

		new Incubator().placeEggs();

		if (window.matchMedia('(pointer: coarse)').matches) {
			projectDetails.collapseAll();
		}
	};

	window.onresize = () => {
		tabs.displayTabs();
	}

	window.onbeforeprint = () => {
		progressBar.setLevelAndExperience();
		darkMode.printInNormalMode();
		projectDetails.saveState();
		projectDetails.openAll();
	}

	window.onafterprint = () => {
		tabs.displayTabs();
		darkMode.applyDarkModeSettings();
		projectDetails.restoreState();
	}

	window.onwheel = (event) => {
		if (event.target.tagName !== 'HTML') {
      return;
    }

		tabs.scroll(event);
	}
})();
