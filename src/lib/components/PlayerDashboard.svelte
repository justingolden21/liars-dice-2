<script>
	import { game } from '$lib/stores/game';

	import getDie from '$lib/util/getDie';
	import RaiseBetButton from './RaiseBetButton.svelte';

	$: currentPlayer = $game.players[$game.turn];

	$: playerName = currentPlayer.name || `Player ${$game.turn + 1}`;

	// game functions

	function doCall() {
		$game.bet.state = 'called';
		$game.state = 'roundEnd';
	}
	function doRaise() {}
	function doSpot() {
		$game.bet.state = 'spotted';
		$game.state = 'roundEnd';
	}
</script>

<p class="font-bold">{playerName}'s turn</p>

<!-- Current Bet -->

<p>Current bet: {$game.bet.amount} {$game.bet.face} {$game.bet.amount !== 1 ? 's' : ''}</p>

<!-- Dice -->
{#each $game.players as player}
	{#if player.dice.length > 0}
		{#each player.dice as die}
			{#if player === currentPlayer}
				<span class="text-5xl">{getDie(die)}</span>
			{:else}
				<span class="text-5xl">◻</span>
			{/if}
		{/each}
		<br />
	{/if}
{/each}

<!-- Moves -->
<!-- TODO -->
<button on:click={doCall}>Call</button>
<RaiseBetButton />
<button on:click={doSpot}>Spot</button>
