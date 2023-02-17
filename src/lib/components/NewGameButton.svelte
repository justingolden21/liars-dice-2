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
		class="button {$game.state === 'gameOver' ? '-primary' : '-danger'} block mt-10 mx-auto"
	>
		{$game.state === 'gameOver' ? 'New Game' : 'Restart Game'}
	</button>
</Modal>
