<script>
	/**
	 * Modal component
	 *
	 * Closes on click away, esc, or close button
	 * Traps focus
	 * Modified from:
	 * @link https://svelte.dev/examples/modal
	 */

	import { createEventDispatcher, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	let modal;

	const handle_keydown = (e) => {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// Trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};

	const previously_focused = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal-background" on:click={close} />

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
	<div class="flex items-center justify-between gap-4 border-b border-gray-200 pb-4 mb-4">
		<slot name="header" />
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={close} class="button -danger">&times;</button>
	</div>
	<slot />
</div>

<style lang="postcss">
	.modal-background {
		@apply fixed top-0 left-0 w-full h-full bg-black/30;
	}

	.modal {
		@apply absolute left-1/2 top-1/2 overflow-auto -translate-x-1/2 -translate-y-1/2 p-4 rounded bg-white;
		width: calc(100vw - 4rem);
		max-width: 32rem;
		max-height: calc(100vh - 4rem);
	}
</style>
