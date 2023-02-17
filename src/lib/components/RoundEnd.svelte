<!-- shows result of round
    continune btn changes state to next player (with dice left) and has appropriate player lose dice
 -->
<script>
	import { game } from '$lib/stores/game';
	import getRoll from '../util/getRoll';

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
		$game.turn = getNextPlayer(); // todo: determine next player

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

<p>Round over</p>

<p>{currentPlayerName} {$game.state === 'called' ? 'called' : 'spotted'}</p>

<!-- TODO: dedupe from player dash -->
<p>
	{betPlayerName}'s bet of {$game.bet.amount}
	{$game.bet.face}
	{$game.bet.amount !== 1 ? 's' : ''}
</p>

<p>{currentPlayerName} was {playerCorrect() ? 'right' : 'wrong'}</p>

<p>There were {getCount($game.bet.face)}</p>

TODO: show all dice (make component, also used in player dashboard)

<button on:click={endRound}>Continue to {getPlayerName(getNextPlayer())}</button>
