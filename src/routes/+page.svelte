<script>
	/**
	 * Main `index.html` route that acts as a parent for all game logic
	 *
	 * @TODO store game history
	 * @TODO fullscreen, contact, about, and how to play
	 * @TODO make it a PWA
	 *
	 * @TODO maybe: stats for which players have won vs how many games they've played, stats for number of players and dice per game, etc.
	 * @TODO maybe: show previous bet history this round
	 */

	import { game } from '$lib/stores/game';
	import NewGameButton from '$lib/components/NewGameButton.svelte';
	import PassThePhone from '$lib/components/PassThePhone.svelte';
	import PlayerDashboard from '$lib/components/PlayerDashboard.svelte';
	import RoundEnd from '$lib/components/RoundEnd.svelte';
</script>

<div class="container mx-auto sm:p-8 h-screen flex flex-col items-center justify-between gap-4">
	<h1 class="h1 text-center mb-10">Liar's Dice</h1>

	{#if $game.bet.face !== 1 || $game.state !== 'gameOver'}
		<div class="bg-blue-900 text-white p-4 sm:p-10">
			{#if $game.state === 'passPhone'}
				<PassThePhone />
			{:else if $game.state === 'playerTurn'}
				<PlayerDashboard />
			{:else if $game.bet.face !== 1}
				<!-- 'called', 'spotted', or 'gameOver' -->
				<RoundEnd />
			{/if}
		</div>
	{/if}

	<NewGameButton />
</div>
