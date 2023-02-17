<script>
	// TODO: split into game.js
	// TODO: local store
	// TODO: store game history
	// TODO: fullscreen, contact, about, how to play
    // TODO: make my own modal component

	import { game } from '$lib/stores/game';

	import NewGameButton from '$lib/components/NewGameButton.svelte';
	import PassThePhone from '$lib/components/PassThePhone.svelte';
	import PlayerDashboard from '$lib/components/PlayerDashboard.svelte';
	import RoundEnd from '$lib/components/RoundEnd.svelte';
</script>

<div class="container mx-auto p-8">
	<h1 class="text-3xl lg:text-5xl font-light text-center">Liar's Dice</h1>
	<!-- FIXME -->
	{#if !game?.state?.over}
		{#if $game.state === 'passPhone'}
			<PassThePhone />
		{:else if $game.state === 'playerDash'}
			<PlayerDashboard />
		{:else if $game.state === 'called' || $game.state === 'spotted'}
			<RoundEnd />
		{/if}
	{/if}

	<NewGameButton />

	<!-- ⚀ ⚁ ⚂ ⚃ ⚄ ⚅ -->
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}

	:global(::selection) {
		background-color: theme(colors.blue.700);
		color: theme(colors.white);
	}
	:global(*:focus) {
		@apply ring ring-blue-300 outline-none;
	}
</style>
