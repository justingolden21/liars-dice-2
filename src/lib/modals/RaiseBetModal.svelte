<script>
	import { game } from '$lib/stores/game';

	export let showModal;

	// TODO: clean up
	function getNumTotalDice() {
		let num = 0;
		for (let i = 0; i < $game.players.length; i++) {
			num += $game.players[i].dice.length;
		}
		return num;
	}

	function getNextPlayer() {
		const currentPlayer = $game.turn;
		let nextPlayer = currentPlayer;
		// move sequentially to next player, looping from end to start, skipping players without dice
		do {
			if (nextPlayer === $game.players.length - 1) {
				nextPlayer = 0;
			} else {
				nextPlayer++;
			}
		} while ($game.players[nextPlayer].dice.length === 0);

		return nextPlayer;
	}

	function raise() {
		// Set game bet
		$game.bet = {
			amount: betAmount,
			face: betFace,
			player: $game.turn
		};

		// Set state to pass phone
		$game.state = 'passPhone';

		$game.turn = getNextPlayer();

		// Close modal
		showModal = false;
	}

	let betAmount = $game.bet.face === 6 ? $game.bet.amount + 1 : $game.bet.amount;
	let betFace = $game.bet.face === 6 ? 2 : $game.bet.face + 1;
</script>

<div class="mt-4">
	<label for="bet-amount-select">Amount</label>
	<select bind:value={betAmount} id="bet-amount-select" class="select">
		{#each Array(getNumTotalDice()) as _, i}
			{#if i + ($game.bet.face === 6 ? 0 : 1) >= $game.bet.amount}
				<option value={i + 1}>{i + 1}</option>
			{/if}
		{/each}
	</select>
</div>

<div class="mt-4">
	<label for="bet-face-select">Face</label>
	<select bind:value={betFace} id="bet-face-select" class="select">
		{#each Array(5) as _, i}
			<option disabled={$game.bet.amount === betAmount && $game.bet.face > i + 1} value={i + 2}>
				{i + 2}
			</option>
		{/each}
	</select>
</div>

<button on:click={raise} class="button -primary block mt-6 mb-4">Raise</button>
