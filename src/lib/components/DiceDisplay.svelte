<script>
	/**
	 * Displays each players' dice
	 * @param showAll - boolean - if true show all dice, else hide dice from non active players
	 * Used by `PlayerDashboard` and `RoundEnd`
	 */

	import { game } from '$lib/stores/game';
	import DieIcon from '$lib/components/DieIcon.svelte';

	export let showAll = false;

	$: currentPlayer = $game.players[$game.turn];

	function getPlayerName(idx) {
		return $game.players[idx].name || `Player ${idx + 1}`;
	}
</script>

{#each $game.players as player, idx}
	{#if player.dice.length > 0}
		<p class="p">{getPlayerName(idx)}:</p>
		<div>
			{#each player.dice as die}
				{#if player === currentPlayer || showAll}
					<DieIcon number={die} />
				{:else}
					<DieIcon number="0" />
				{/if}
			{/each}
		</div>
		<br />
	{/if}
{/each}
