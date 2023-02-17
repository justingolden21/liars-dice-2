<script>
	import { game } from '$lib/stores/game';

	export let modal;

	// TODO: clean up
	function getNumTotalDice() {
		let num = 0;
		for (let i = 0; i < $game.players.length; i++) {
			num += $game.players[i].dice.length;
		}
		return num;
	}

	function raise() {
		// Set game bet
		$game.bet = {
			amount: betAmount,
			face: betFace
		};

		// Set state to pass phone
		$game.state = 'passPhone';

		// Close modal
		modal.set(null);
	}

	// TODO: prevent from having bet greater than number of dice
	let betAmount = $game.bet.face === 6 ? $game.bet.amount + 1 : $game.bet.amount;
	let betFace = $game.bet.face === 6 ? 2 : $game.bet.face + 1;
</script>

<label for="bet-amount-select">Amount</label>
<select bind:value={betAmount} id="bet-amount-select" class="px-4 py-2 bg-white">
	{#each Array(getNumTotalDice()) as _, i}
		{#if i + ($game.bet.face === 6 ? 0 : 1) >= $game.bet.amount}
			<option value={i + 1}>{i + 1}</option>
		{/if}
	{/each}
</select>

<br />

<label for="bet-face-select">Face</label>
<select bind:value={betFace} id="bet-face-select" class="px-4 py-2 bg-white">
	{#each Array(5) as _, i}
		<option disabled={$game.bet.amount === betAmount && $game.bet.face > i + 1} value={i + 2}>
			{i + 2}
		</option>
	{/each}
</select>

<button
	on:click={raise}
	class="block mt-4 px-4 py-2 bg-blue-700 text-white text-center rounded hover:bg-blue-600"
>
	Raise
</button>
