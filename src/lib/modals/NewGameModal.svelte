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
        $game.state.over = false;

		// Close modal
		modal.set(null);
	}

	let numPlayers = 2;
	let numDice = 5;
</script>

<label for="num-players-select">Number of players</label>
<select bind:value={numPlayers} id="num-players-select" class="px-4 py-2 bg-white">
	{#each Array(5) as _, i}
		<option value={i + 2}>{i + 2}</option>
	{/each}
</select>

<br />

<label for="num-dice-select">Number of dice</label>
<select bind:value={numDice} id="num-dice-select" class="px-4 py-2 bg-white">
	{#each Array(10) as _, i}
		<option value={i + 1}>{i + 1}</option>
	{/each}
</select>

<button
	on:click={newGame}
	class="block mt-4 px-4 py-2 bg-blue-700 text-white text-center rounded hover:bg-blue-600"
>
	Start Game
</button>
