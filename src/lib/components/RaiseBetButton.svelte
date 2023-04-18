<script>
	/**
	 * Displays a button to raise the current bet, which opens `RaiseBetModal`
	 * Used by `PlayerDashboard`
	 */

	import Modal from '$lib/components/Modal.svelte';
	import RaiseBetModal from '$lib/modals/RaiseBetModal.svelte';

	let showModal = false;
</script>

<button on:click={() => (showModal = true)} class="button -white"> Raise </button>

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<h3 slot="header" class="h2 mt-0">Raise Bet</h3>
		<RaiseBetModal bind:showModal />
	</Modal>
{/if}
