(() => {
	let progressBar = null;
	let tabs = null;

	window.onload = () => {
		progressBar = new ProgressBar();
		tabs = new TabComponent();
	};

	window.onbeforeprint = () => {
		tabs.linearizeTabs();
		progressBar.setLevelAndExperience();
	}

	window.onafterprint = () => {
		tabs.displayTabs();
	}
})();