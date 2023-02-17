<script>
	import { writable } from 'svelte/store';

	import Modal, { bind } from 'svelte-simple-modal';

	import RaiseBetModal from '$lib/modals/RaiseBetModal.svelte';
	const modal = writable(null);
	const showModal = () => modal.set(bind(RaiseBetModal, { modal }));
</script>

<Modal show={$modal}>
	<button on:click={showModal} class="button -secondary"> Raise </button>
</Modal>
