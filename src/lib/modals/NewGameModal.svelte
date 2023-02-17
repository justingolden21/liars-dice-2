<script>
	import { game, resetGame } from '$lib/stores/game';
	import getRoll from '$lib/util/getRoll';

	export let modal;

	function newGame() {
		resetGame();

		// Set up `numDice` and `players` in `$game`
		$game.numDice = numDice;
		const players = [];
		for (let i = 0; i < numPlayers; i++) {
			players.push({
				name: '',
				dice: Array(numDice)
					.fill(0)
					.map((_) => getRoll())
			});
		}
		$game.players = players;
		$game.state = 'passPhone';

		// Close modal
		modal.set(null);
	}

	let numPlayers = 2;
	let numDice = 5;
</script>

<p class="h3">New Game</p>

<div class="mt-4">
	<label for="num-players-select">Number of players</label>
	<select bind:value={numPlayers} id="num-players-select" class="select">
		{#each Array(5) as _, i}
			<option value={i + 2}>{i + 2}</option>
		{/each}
	</select>
</div>

<div class="mt-4">
	<label for="num-dice-select">Number of dice</label>
	<select bind:value={numDice} id="num-dice-select" class="select">
		{#each Array(10) as _, i}
			<option value={i + 1}>{i + 1}</option>
		{/each}
	</select>
</div>

<button on:click={newGame} class="button -primary block mt-6 mb-4"> Start Game </button>
