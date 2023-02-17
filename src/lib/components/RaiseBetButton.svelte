<script>
	import { writable } from 'svelte/store';

	import { game } from '$lib/stores/game';

	import Modal, { bind } from 'svelte-simple-modal';

	import RaiseBetModal from '$lib/modals/RaiseBetModal.svelte';
	const modal = writable(null);
	const showModal = () => modal.set(bind(RaiseBetModal, { modal }));

	// TODO: dedupe
	function getNumTotalDice() {
		let num = 0;
		for (let i = 0; i < $game.players.length; i++) {
			num += $game.players[i].dice.length;
		}
		return num;
	}
</script>

<Modal show={$modal}>
	{#if !$game || $game.bet.amount !== getNumTotalDice() || $game.bet.face !== 6}
		<button on:click={showModal} class="button -secondary"> Raise </button>
	{/if}
</Modal>
