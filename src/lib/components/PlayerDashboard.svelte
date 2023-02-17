<script>
	import { game } from '$lib/stores/game';

	import getDie from '$lib/util/getDie';

	$: currentPlayer = $game.players[$game.state.turn];

	$: playerName = currentPlayer.name || `Player ${$game.state.turn + 1}`;
</script>

<p class="font-bold">{playerName}'s turn</p>

<!-- Current Bet -->

<p>Current bet: {$game.bet.amount} {$game.bet.face} {$game.bet.amount !== 1 ? 's' : ''}</p>

<!-- Dice -->
{#each $game.players as player}
	{#each player.dice as die}
		{#if player === currentPlayer}
			<span class="text-5xl">{getDie(die)}</span>
		{:else}
			<span class="text-5xl">◻</span>
		{/if}
	{/each}

	<br />
{/each}

<!-- Moves -->
<!-- TODO -->
<button>Call</button>
<button>Raise</button>
<button>Spot</button>


