<script>
	/**
	 * Displays a button to raise the current bet, which opens `RaiseBetModal`
	 * Only shows the button if the bet can be raised
	 * Used by `PlayerDashboard`
	 */

	import { game } from '$lib/stores/game';
	import Modal from '$lib/components/Modal.svelte';
	import RaiseBetModal from '$lib/modals/RaiseBetModal.svelte';
	import getNumTotalDice from '$lib/util/getNumTotalDice';

	let showModal = false;
</script>

<!-- Only render if the bet can be raised -->
{#if !$game || $game.bet.amount !== getNumTotalDice() || $game.bet.face !== 6}
	<button on:click={() => (showModal = true)} class="button -white"> Raise </button>
{/if}

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<h3 slot="header" class="h3">Raise Bet</h3>
		<RaiseBetModal bind:showModal />
	</Modal>
{/if}
