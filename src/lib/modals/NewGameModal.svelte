<script>
	/**
	 * Displays a Modal for starting a new game
	 * Handles new game logic
	 * Used by `NewGameButton`
	 */

	import { game, resetGame } from '$lib/stores/game';
	import getRoll from '$lib/util/getRoll';

	export let showModal;

	function newGame() {
		resetGame();

		// Set up `numDice` and `players` in `$game`
		$game.numDice = numDice;
		const players = [];
		for (let i = 0; i < numPlayers; i++) {
			players.push({
				name: document.getElementById('player' + i).value.trim(),
				dice: Array(numDice)
					.fill(0)
					.map((_) => getRoll())
			});
		}
		$game.players = players;
		$game.state = 'passPhone';

		// Close modal
		showModal = false;
	}

	let numPlayers = 2;
	let numDice = 5;
</script>

<h3 class="h3">Game Setup</h3>

<div class="mt-4">
	<label for="num-players-select">Number of players</label>
	<select bind:value={numPlayers} id="num-players-select" class="input">
		{#each Array(5) as _, i}
			<option value={i + 2}>{i + 2}</option>
		{/each}
	</select>
</div>

<div class="mt-4">
	<label for="num-dice-select">Number of dice</label>
	<select bind:value={numDice} id="num-dice-select" class="input">
		{#each Array(10) as _, i}
			<option value={i + 1}>{i + 1}</option>
		{/each}
	</select>
</div>

<hr />

<h3 class="h3">Player Names (optional)</h3>

{#each Array(numPlayers) as _, idx}
	<div class="my-4">
		<label for="player{idx}">Player {idx + 1}:</label>
		<input id="player{idx}" type="text" class="input" />
	</div>
{/each}

<hr />

<button on:click={newGame} class="button -primary block mt-6 mb-4">Start Game</button>
