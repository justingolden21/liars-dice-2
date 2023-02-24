<script>
	/**
	 * Game screen telling the user to pass the phone to the next player
	 * Used by `+page`
	 */

	import { game } from '$lib/stores/game';

	$: playerName = $game.players[$game.turn].name || `Player ${$game.turn + 1}`;

	function passPhone() {
		$game.state = 'playerTurn';
	}
</script>

<p class="h3">Pass the phone to {playerName}</p>

<button on:click={passPhone} class="button -white mt-4">Continue →</button>
