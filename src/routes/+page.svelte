<script>
	// TODO: store game history
	// TODO: fullscreen, contact, about, how to play

	// TODO: handle game over
	// Only runs on continue click, needs to check what will happen after die is lost

	// TODO: players can enter names
	// TODO: favicon, title, seo meta

	import { game } from '$lib/stores/game';

	import NewGameButton from '$lib/components/NewGameButton.svelte';
	import PassThePhone from '$lib/components/PassThePhone.svelte';
	import PlayerDashboard from '$lib/components/PlayerDashboard.svelte';
	import RoundEnd from '$lib/components/RoundEnd.svelte';
</script>

<div class="container mx-auto p-8">
	<h1 class="h1 text-center mb-10">Liar's Dice</h1>

	<hr />

	{#if !($game.state === 'gameOver')}
		{#if $game.state === 'passPhone'}
			<PassThePhone />
		{:else if $game.state === 'playerTurn'}
			<PlayerDashboard />
		{:else if $game.state === 'called' || $game.state === 'spotted'}
			<RoundEnd />
		{/if}
	{/if}

	<hr />

	<NewGameButton />
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
