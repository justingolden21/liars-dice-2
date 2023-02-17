<script>
	import { game } from '$lib/stores/game';

	$: playerName = $game.players[$game.turn].name || `Player ${$game.turn + 1}`;

	function passPhone() {
		$game.state = 'playerDash';
	}
</script>

<p>Pass the phone to {playerName}</p>

<button on:click={passPhone}>Continue</button>
