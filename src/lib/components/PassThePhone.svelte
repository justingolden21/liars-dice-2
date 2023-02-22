<script>
	import { game } from '$lib/stores/game';

	$: playerName = $game.players[$game.turn].name || `Player ${$game.turn + 1}`;

	function passPhone() {
		$game.state = 'playerTurn';
	}
</script>

<p class="h3">Pass the phone to {playerName}</p>

<button on:click={passPhone} class="button -secondary mt-4">Continue →</button>
