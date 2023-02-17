<script>
	import { game } from '$lib/stores/game';

	$: playerName = $game.players[$game.state.turn].name || `Player ${$game.state.turn + 1}`;

	function passPhone() {
		$game.state.passThePhone = false;
	}
</script>

<p>Pass the phone to {playerName}</p>

<button on:click={passPhone}>Continue</button>
