<!-- shows result of round
    continune btn changes state to next player (with dice left) and has appropriate player lose dice
 -->
<script>
	import { game } from '$lib/stores/game';
	import DieIcon from '$lib/components/DieIcon.svelte';
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

	function endRound() {
		// if current player is right, then better is wrong, else current player is wrong
		const loserPlayer = playerCorrect() ? $game.bet.player : $game.turn;
		// loser loses a die
		$game.players[loserPlayer].dice.pop();

		if (gameIsOver()) {
			$game.state = 'gameOver';
		}

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

	function gameIsOver() {
		return $game.players.filter((p) => p.dice.length > 0).length === 1;
	}

	function getWinner() {
		for (let i = 0; i < $game.players.length; i++) {
			if ($game.players[i].dice.length > 0) {
				return i;
			}
		}
	}
</script>

<p class="h2">Round over</p>

<p class="p">
	<span>{currentPlayerName} {$game.state === 'called' ? 'called' : 'spotted'}</span>

	<!-- TODO: dedupe from player dash -->
	<span>
		{betPlayerName}'s bet of
		<span class="font-bold">
			{$game.bet.amount}
			{$game.bet.face}
			{$game.bet.amount !== 1 ? 's' : ''}
		</span>
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

<hr />

{#if $game.state === 'gameOver'}
	<p class="h3">Game Over</p>
	<p class="p">{getPlayerName(getWinner())} wins!</p>
{:else}
	<button on:click={endRound} class="button -secondary">
		Continue to {getPlayerName(getNextPlayer())}
	</button>
{/if}
