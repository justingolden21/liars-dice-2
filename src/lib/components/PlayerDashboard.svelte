<script>
	import { game } from '$lib/stores/game';

	import getDie from '$lib/util/getDie';
	import RaiseBetButton from '$lib/components/RaiseBetButton.svelte';

	$: currentPlayer = $game.players[$game.turn];

	$: playerName = currentPlayer.name || `Player ${$game.turn + 1}`;

	// game functions

	function doCall() {
		$game.state = 'called';
	}
	function doSpot() {
		$game.state = 'spotted';
	}
</script>

<p class="font-bold">{playerName}'s turn</p>

<!-- Current Bet -->

{#if $game.bet.face !== 1}
	<p>Current bet: {$game.bet.amount} {$game.bet.face} {$game.bet.amount !== 1 ? 's' : ''}</p>
{/if}

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
<RaiseBetButton />
{#if $game.bet.face !== 1}
	<button on:click={doCall}>Call</button>
	<button on:click={doSpot}>Spot</button>
{/if}
