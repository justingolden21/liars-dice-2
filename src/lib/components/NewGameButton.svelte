<script>
	import { writable } from 'svelte/store';

	import Modal, { bind } from 'svelte-simple-modal';

	import { game } from '$lib/stores/game';

	import NewGameModal from '$lib/modals/NewGameModal.svelte';
	const modal = writable(null);
	const showModal = () => modal.set(bind(NewGameModal, { modal }));
</script>

<Modal show={$modal}>
	<button
		on:click={showModal}
		class="block mt-10 px-4 py-2 bg-blue-700 text-white text-center rounded hover:bg-blue-600"
	>
		{$game.over ? 'New Game' : 'Restart Game'}
	</button>
</Modal>
