<script>
	/**
	 * Game screen for the end of a round (or game)
	 * Shows the result of a round
	 * Continue button changes state to the next valid player
	 * Handles the appropriate player losing dice and rerolling dice
	 * Used by `+page`
	 */

	import { onMount } from 'svelte';
	import { game } from '$lib/stores/game';
	import BetDisplay from '$lib/components/BetDisplay.svelte';
	import DiceDisplay from '$lib/components/DiceDisplay.svelte';
	import getNextPlayer from '$lib/util/getNextPlayer';
	import getRoll from '$lib/util/getRoll';

	$: betPlayerName = getPlayerName($game.bet.player);
	$: currentPlayerName = getPlayerName($game.turn);

	function getPlayerName(idx) {
		return $game.players[idx].name || `Player ${idx + 1}`;
	}

	// Get count of how many of specific die (counting 1s) in all players' hands
	function getCount(die) {
		let num = 0;
		for (let i = 0; i < $game.players.length; i++) {
			num += $game.players[i].dice.filter((d) => d === die || d === 1).length;
		}
		return num;
	}

	// Returns true if the current player is correct, else false
	function playerCorrect() {
		if ($game.state === 'spotted') {
			// Player is correct in spot if num dice in bet is same as amount of dice bet
			return getCount($game.bet.face) === $game.bet.amount;
		} else {
			// Player is correct in call if num dice in bet is larger than amount of dice bet
			return getCount($game.bet.face) < $game.bet.amount;
		}
	}

	// Reroll all players' dice
	function rerollDice() {
		for (let i = 0; i < $game.players.length; i++) {
			$game.players[i].dice.map((_) => getRoll());
		}
	}

	// Return the player index of the losing player
	function getLoserPlayer() {
		// if current player is right, then better is wrong, else current player is wrong
		return playerCorrect() ? $game.bet.player : $game.turn;
	}

	/**
	 * Handles end of round logic
	 *
	 * The loser loses a die, the turn goes to the next player,
	 * players reroll dice, and the bet is reset
	 */
	function endRound() {
		// Loser loses a die
		$game.players[getLoserPlayer()].dice.pop();

		// Turn goes to next player
		$game.state = 'playerTurn';
		$game.turn = getNextPlayer();

		// Players reroll dice
		rerollDice();

		// Reset bet (`bet.face` is 1 so we have an invalid bet that cannot be called or spotted)
		$game.bet = {
			amount: 1,
			face: 1,
			player: 0
		};
	}

	/**
	 * Sets game state to 'gameOver' if the game will be over
	 * This runs `onMount` so we know if the game will be over
	 * This way, we don't remove a die before the previous round's results are displayed
	 */
	function checkGameOver() {
		// If there are exactly 2 players and a player will lose their last die
		const gameWillBeOver =
			$game.players.filter((p) => p.dice.length > 0).length === 2 &&
			$game.players[getLoserPlayer()].dice.length === 1;

		if (gameWillBeOver) {
			$game.state = 'gameOver';
		}
	}

	onMount(checkGameOver);

	// Return index of the winning player
	function getWinner() {
		for (let i = 0; i < $game.players.length; i++) {
			if ($game.players[i].dice.length > 0) {
				return i;
			}
		}
	}
</script>

<p class="h2">
	{$game.state === 'gameOver' ? 'Game Over' : 'Round Over'}
	{#if $game.state === 'gameOver'}
		<span>&mdash; {getPlayerName(getWinner())} wins!</span>
	{/if}
</p>

<p class="p">
	<span>{currentPlayerName} <span class="font-bold">{$game.state === 'called' ? 'called' : 'spotted'}</span></span>
	<span>{betPlayerName}'s bet of <BetDisplay /></span>
</p>

<p class="p">
	<span>{currentPlayerName} was <span class="font-bold">{playerCorrect() ? 'right' : 'wrong'}</span>.</span>
	<span>There were <span class="font-bold">{getCount($game.bet.face)}</span></span>
</p>

<hr />

<DiceDisplay showAll />

{#if $game.state !== 'gameOver'}
	<hr />
	<button on:click={endRound} class="button -white">
		Continue to {getPlayerName(getNextPlayer())} →
	</button>
{/if}
