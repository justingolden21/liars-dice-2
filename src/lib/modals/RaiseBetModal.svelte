<script>
	/**
	 * Displays a Modal for raising a bet
	 * Handles raise bet logic
	 * Used by `RaiseBetButton`
	 */

	import { game } from '$lib/stores/game';
	import getNextPlayer from '$lib/util/getNextPlayer';
	import getNumTotalDice from '$lib/util/getNumTotalDice';

	export let showModal;

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
	<select bind:value={betAmount} id="bet-amount-select" class="input">
		{#each Array(getNumTotalDice()) as _, i}
			{#if i + ($game.bet.face === 6 ? 0 : 1) >= $game.bet.amount}
				<option value={i + 1}>{i + 1}</option>
			{/if}
		{/each}
	</select>
</div>

<div class="mt-4">
	<label for="bet-face-select">Face</label>
	<select bind:value={betFace} id="bet-face-select" class="input">
		{#each Array(5) as _, i}
			<option disabled={$game.bet.amount === betAmount && $game.bet.face > i + 1} value={i + 2}>
				{i + 2}
			</option>
		{/each}
	</select>
</div>

<button on:click={raise} class="button -primary block mt-6 mb-4">Raise</button>
