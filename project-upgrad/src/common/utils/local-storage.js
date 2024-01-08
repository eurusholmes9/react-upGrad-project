export const getValue = (keyName) => {
	try {
		const value = window.localStorage.getItem(keyName);
		if (value) {
			return JSON.parse(value);
		} else {
			return;
		}
	} catch (err) {
		return;
	}
};

export const setValue = (keyName, newValue, defaultValue) => {
	try {
		window.localStorage.setItem(keyName, JSON.stringify(newValue));
	} catch (err) {
		return defaultValue;
	}
};
