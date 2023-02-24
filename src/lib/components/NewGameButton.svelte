<script>
	/**
	 * Displays a button to start / restart a new game, which opens `NewGameModal`
	 * Text is conditionally rendered based on if the game is over
	 * Used by `+page`
	 */

	import { game } from '$lib/stores/game';
	import Modal from '$lib/components/Modal.svelte';
	import NewGameModal from '$lib/modals/NewGameModal.svelte';

	let showModal = false;

	$: gameOver = $game.state === 'gameOver';
</script>

<button on:click={() => (showModal = true)} class="button {gameOver ? '-primary' : '-danger'}">
	{gameOver ? 'New Game' : 'Restart Game'}
</button>

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<h3 slot="header" class="h3">New Game</h3>
		<NewGameModal bind:showModal />
	</Modal>
{/if}
