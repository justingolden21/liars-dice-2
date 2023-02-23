<script>
	import { game } from '$lib/stores/game';

	import DieIcon from '$lib/components/DieIcon.svelte';

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

<p class="h3">{playerName}'s turn</p>

<!-- Current Bet -->

{#if $game.bet.face !== 1}
	<p class="p">
		Current bet: <span class="font-bold">
			{$game.bet.amount}
			{$game.bet.face}
			{$game.bet.amount !== 1 ? 's' : ''}
		</span>
	</p>
{/if}

<!-- Dice -->
<div class="my-6">
	{#each $game.players as player}
		{#if player.dice.length > 0}
			<div>
				{#each player.dice as die}
					{#if player === currentPlayer}
						<DieIcon number={die} />
					{:else}
						<DieIcon number="0" />
					{/if}
				{/each}
			</div>
			<br />
		{/if}
	{/each}
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
