(() => {
	const birthday = new Date('12 Jan 1991 13:05');

	const setLevelAndExperience = () => {
		const today = new Date();

		const age = new Date(today.getTime() - birthday.getTime()).getUTCFullYear() - 1970;
		const nextBirthday = new Date(birthday.getUTCFullYear() + age + 1, birthday.getUTCMonth(), birthday.getUTCDate(), birthday.getUTCHours(), birthday.getUTCMinutes());
		const progress = (nextBirthday.getTime() - today.getTime()) / (36000 * 24);
		const percent = 100 - progress / 365;

		document.getElementById('progress-bar').dataset.label = `Level ${age} programmer`;
		document.getElementById('fill').style.width = percent.toFixed(2) + '%';
	};

	let tabs = null;

	window.onload = () => {
		document.getElementById('fill').style.width = '0%';
		setInterval(setLevelAndExperience, 1000);

		tabs = new TabComponent();
	};

	window.onbeforeprint = () => {
		document.body.style.overflowY = 'auto';
		document.getElementById('fill').style.transition = 'none';
		tabs.linearizeTabs();
		setLevelAndExperience();
	}

	window.onafterprint = () => {
		document.body.style.overflowY = 'hidden';
		tabs.displayTabs();
	}
})();