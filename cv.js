(() => {
	let darkMode = null;
	let progressBar = null;
	let tabs = null;

	window.onload = () => {
		darkMode = new DarkModeDetector();
		progressBar = new ProgressBar();
		tabs = new TabComponent();
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

	const [url, parameterList] = window.location.href.split('?');
	if (parameterList === undefined) {
		return;
	}

	const params = parameterList.split('&').map((param) => param.split('='));
	const tab = params.find((param) => param[0] === 'tab');

	if (tab === undefined) {
		history.pushState({}, '', url);
	} else if (params.length > 1) {
		history.pushState({}, '', `${url}?tab=${tab[1]}`);
	}
})();