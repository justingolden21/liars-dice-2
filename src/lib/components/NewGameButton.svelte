<script>
	import Modal from './Modal.svelte';

	let showModal = false;

	import { game } from '$lib/stores/game';

	import NewGameModal from '$lib/modals/NewGameModal.svelte';
</script>

<button
	on:click={() => (showModal = true)}
	class="button {$game.state === 'gameOver' ? '-primary' : '-danger'} block mt-10 mx-auto"
>
	{$game.state === 'gameOver' ? 'New Game' : 'Restart Game'}
</button>

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<h3 slot="header" class="h3">New Game</h3>

		<NewGameModal bind:showModal />
	</Modal>
{/if}
