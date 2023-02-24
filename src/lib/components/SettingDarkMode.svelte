<script>
	/**
	 * Handles all logic for dark mode setting
	 * Renders a button to toggle dark mode
	 * Used by `+page`
	 */

	import { settings } from '$lib/stores/settings';
	import { onMount } from 'svelte';

	// Update setting on load
	onMount(() => {
		if ($settings.darkMode === null) {
			// If unset, set to system default by default
			$settings.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
	});

	// Update setting on button press
	function toggleDarkMode() {
		$settings.darkMode = !$settings.darkMode;
	}

	// Listen for updates to setting and update class name
	$: if ($settings.darkMode === true) {
		document?.documentElement.classList.add('dark');
	} else if ($settings.darkMode === false) {
		document?.documentElement.classList.remove('dark');
	}
</script>

<button title="Dark mode" on:click={toggleDarkMode} class="button -secondary"> ☾ </button>
