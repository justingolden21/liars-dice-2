/**
 * Create a store that syncs with `localStorage`
 * Adapted from rgbstudios
 */

import merge from 'lodash.merge';
import { writable } from 'svelte/store';

function localStore(key, defaultValue) {
	const store = writable(defaultValue);

	if (typeof localStorage !== 'undefined') {
		const value = merge(defaultValue, JSON.parse(localStorage.getItem(key) ?? '{}'));
		if (value !== null) store.set(value);

		store.subscribe((val) => {
			localStorage.setItem(key, JSON.stringify(val));
		});
	}

	return store;
}

export default localStore;
