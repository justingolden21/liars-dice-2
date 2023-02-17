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

	// TODO: dedupe
	function getNumTotalDice() {
		let num = 0;
		for (let i = 0; i < $game.players.length; i++) {
			num += $game.players[i].dice.length;
		}
		return num;
	}
</script>

<p class="h3">{playerName}'s turn</p>

<!-- Current Bet -->

{#if $game.bet.face !== 1}
	<p>Current bet: {$game.bet.amount} {$game.bet.face} {$game.bet.amount !== 1 ? 's' : ''}</p>
{/if}

<!-- Dice -->
<div class="my-6">
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
</div>

<!-- Moves -->
<div class="flex gap-4">
	{#if $game.bet.amount !== getNumTotalDice() || $game.bet.face !== 6}
		<RaiseBetButton />
	{/if}
	{#if $game.bet.face !== 1}
		<button on:click={doCall} class="button -secondary">Call</button>
		<button on:click={doSpot} class="button -secondary">Spot</button>
	{/if}
</div>
