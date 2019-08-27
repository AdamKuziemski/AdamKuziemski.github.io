(() => {
	let progressBar = null;
	let tabs = null;

	window.onload = () => {
		progressBar = new ProgressBar();
		tabs = new TabComponent();
	};

	window.onresize = () => {
		tabs.displayTabs();
	}

	window.onbeforeprint = () => {
		tabs.linearizeTabs();
		progressBar.setLevelAndExperience();
	}

	window.onafterprint = () => {
		tabs.displayTabs();
	}
})();