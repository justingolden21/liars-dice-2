<script>
	import { writable } from 'svelte/store';
	import Modal, { bind } from 'svelte-simple-modal';
	import NewGameModal from '$lib/modals/NewGameModal.svelte';
	const modal = writable(null);
	const showModal = () => modal.set(bind(NewGameModal));
</script>

<Modal show={$modal}>
    <button on:click={showModal} class="px-4 py-2 bg-blue-700 text-white text-center rounded hover:bg-blue-600">
		New Game
	</button>
</Modal>
