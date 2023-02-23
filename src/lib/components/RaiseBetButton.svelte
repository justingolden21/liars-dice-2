<script>
	import Modal from './Modal.svelte';

	let showModal = false;

	import { game } from '$lib/stores/game';

	import RaiseBetModal from '$lib/modals/RaiseBetModal.svelte';

	import getNumTotalDice from '$lib/util/getNumTotalDice';
</script>

{#if !$game || $game.bet.amount !== getNumTotalDice() || $game.bet.face !== 6}
	<button on:click={() => (showModal = true)} class="button -white"> Raise </button>
{/if}

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<h3 slot="header" class="h3">Raise Bet</h3>

		<RaiseBetModal bind:showModal />
	</Modal>
{/if}
