<script>
	/**
	 * Game screen for the current player's dashboard
	 * Displays their dice and the current bet and options
	 * Used by `+page`
	 */

	import { game } from '$lib/stores/game';
	import BetDisplay from '$lib/components/BetDisplay.svelte';
	import DiceDisplay from '$lib/components/DiceDisplay.svelte';
	import RaiseBetButton from '$lib/components/RaiseBetButton.svelte';

	$: currentPlayer = $game.players[$game.turn];
	$: playerName = currentPlayer.name || `Player ${$game.turn + 1}`;

	// Game functions
	function doCall() {
		$game.state = 'called';
	}
	function doSpot() {
		$game.state = 'spotted';
	}
</script>

<p class="h3">{playerName}'s turn</p>

<!-- Current Bet -->
{#if $game.bet.face !== 1}
	<p class="p">
		Current bet: <BetDisplay />
	</p>
{/if}

<!-- Dice -->
<div class="my-6">
	<DiceDisplay />
</div>

<!-- Moves -->
<div class="flex gap-4">
	<RaiseBetButton />
	<!-- If there is a bet -->
	{#if $game.bet.face !== 1}
		<button on:click={doCall} class="button -white">Call</button>
		<button on:click={doSpot} class="button -white">Spot</button>
	{/if}
</div>
