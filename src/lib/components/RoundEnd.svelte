<!-- shows result of round
    continune btn changes state to next player (with dice left) and has appropriate player lose dice
 -->
<script>
	import { game } from '$lib/stores/game';
	import getRoll from '$lib/util/getRoll';
	import getDie from '$lib/util/getDie';

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

	// TODO: dedupe
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

	// todo: game is over if getNextPlayer returns current player (me thinks)

	function rerollDice() {
		for (let i = 0; i < $game.players.length; i++) {
			$game.players[i].dice.map((_) => getRoll());
		}
	}

	function endRound() {
		$game.state = 'playerDash';
		$game.turn = getNextPlayer();

		// if current player is right, then better is wrong, else current player is wrong
		const loserPlayer = playerCorrect() ? $game.bet.player : $game.turn;
		// loser loses a die
		$game.players[loserPlayer].dice.pop();

		// reroll
		rerollDice();

		// reset bet (todo: dedupe from $game store, move there, needs to be consistent)
		$game.bet = {
			amount: 1,
			face: 1,
			player: 0
		};
	}
</script>

<p class="h2">Round over</p>

<p class="p">
    <span>{currentPlayerName} {$game.state === 'called' ? 'called' : 'spotted'}</span>
    
    <!-- TODO: dedupe from player dash -->
    <span>
        {betPlayerName}'s bet of {$game.bet.amount}
        {$game.bet.face}
        {$game.bet.amount !== 1 ? 's' : ''}
    </span>
</p>

<p class="p">
    <span>{currentPlayerName} was {playerCorrect() ? 'right' : 'wrong'}.</span>
    
    <span>There were {getCount($game.bet.face)}</span>
</p>

<hr>

<!-- TODO: dedupe from player dash -->
<!-- Dice -->
{#each $game.players as player, idx}
	{#if player.dice.length > 0}
    <p class="p">{getPlayerName(idx)}:</p>
		{#each player.dice as die}
			<span class="text-5xl">{getDie(die)}</span>
		{/each}
		<br />
	{/if}
{/each}

<button on:click={endRound} class="button -secondary">Continue to {getPlayerName(getNextPlayer())}</button>
