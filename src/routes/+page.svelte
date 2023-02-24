<script>
	/**
	 * Main `index.html` route that acts as a parent for all game logic
	 * @TODO store game history
	 * @TODO fullscreen, contact, about, and how to play
	 * @TODO players can enter names
	 */

	import { game } from '$lib/stores/game';
	import NewGameButton from '$lib/components/NewGameButton.svelte';
	import PassThePhone from '$lib/components/PassThePhone.svelte';
	import PlayerDashboard from '$lib/components/PlayerDashboard.svelte';
	import RoundEnd from '$lib/components/RoundEnd.svelte';
</script>

<div class="container mx-auto sm:p-8 h-screen flex flex-col items-center justify-between">
	<h1 class="h1 text-center mb-10">Liar's Dice</h1>

	<div class="bg-blue-900 text-white p-4 sm:p-10">
		{#if $game.state === 'passPhone'}
			<PassThePhone />
		{:else if $game.state === 'playerTurn'}
			<PlayerDashboard />
		{:else if $game.bet.face !== 1}
			<!-- call, spot or game over -->
			<RoundEnd />
		{/if}
	</div>

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
