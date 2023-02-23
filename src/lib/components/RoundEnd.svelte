<!-- shows result of round
    continune btn changes state to next player (with dice left) and has appropriate player lose dice
 -->
<script>
	import { onMount } from 'svelte';

	import { game } from '$lib/stores/game';
	import DieIcon from '$lib/components/DieIcon.svelte';
	import BetDisplay from '$lib/components/BetDisplay.svelte';
	import getRoll from '$lib/util/getRoll';
	import getNextPlayer from '$lib/util/getNextPlayer';

	$: currentPlayerName = getPlayerName($game.turn);
	$: betPlayerName = getPlayerName($game.bet.player);

	function getPlayerName(idx) {
		return $game.players[idx].name || `Player ${idx + 1}`;
	}

	// get count of how many of specific die (counting 1s) in all players' hands
	function getCount(die) {
		let num = 0;
		for (let i = 0; i < $game.players.length; i++) {
			num += $game.players[i].dice.filter((d) => d === die || d === 1).length;
		}
		return num;
	}

	function playerCorrect() {
		if ($game.state === 'spotted') {
			// player is correct in spot if num dice in bet is same as amount of dice bet
			return getCount($game.bet.face) === $game.bet.amount;
		} else {
			// player is correct in call if num dice in bet is larger than amount of dice bet
			return getCount($game.bet.face) < $game.bet.amount;
		}
	}

	function rerollDice() {
		for (let i = 0; i < $game.players.length; i++) {
			$game.players[i].dice.map((_) => getRoll());
		}
	}

	function getLoserPlayer() {
		// if current player is right, then better is wrong, else current player is wrong
		return playerCorrect() ? $game.bet.player : $game.turn;
	}

	function endRound() {
		// loser loses a die
		$game.players[getLoserPlayer()].dice.pop();

		$game.state = 'playerTurn';
		$game.turn = getNextPlayer();

		// reroll
		rerollDice();

		// reset bet (todo: dedupe from $game store, move there, needs to be consistent)
		$game.bet = {
			amount: 1,
			face: 1,
			player: 0
		};
	}

	function checkGameOver() {
		// if 2 players and one player will lose their last die
		const gameWillBeOver =
			$game.players.filter((p) => p.dice.length > 0).length === 2 &&
			$game.players[getLoserPlayer()].dice.length === 1;
		if (gameWillBeOver) {
			$game.state = 'gameOver';
		}
	}

	onMount(checkGameOver);

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
	<span>{currentPlayerName} {$game.state === 'called' ? 'called' : 'spotted'}</span>

	<span>
		{betPlayerName}'s bet of
		<BetDisplay />
	</span>
</p>

<p class="p">
	<span>{currentPlayerName} was {playerCorrect() ? 'right' : 'wrong'}.</span>

	<span>There were <span class="font-bold">{getCount($game.bet.face)}</span></span>
</p>

<hr />

<!-- TODO: dedupe from player dash -->
<!-- Dice -->
{#each $game.players as player, idx}
	{#if player.dice.length > 0}
		<p class="p">{getPlayerName(idx)}:</p>
		<div>
			{#each player.dice as die}
				<DieIcon number={die} />
			{/each}
		</div>
		<br />
	{/if}
{/each}

{#if $game.state !== 'gameOver'}
	<hr />
	<button on:click={endRound} class="button -white">
		Continue to {getPlayerName(getNextPlayer())} →
	</button>
{/if}
