/**
 * Store file for the user settings
 */

import localStore from '$lib/util/localStore';

const defaultSettings = {
	darkMode: null // `null` means unset, use system default on load
};

export const settings = localStore('settings', JSON.parse(JSON.stringify(defaultSettings)));

export function resetSettings() {
	settings.set(JSON.parse(JSON.stringify(defaultSettings)));
}
