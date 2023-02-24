import { get } from 'svelte/store';
import { game } from '$lib/stores/game';

/**
 * Returns the index of the next player
 * Starts at the player after the current player
 * Moves through all valid players and loops back at the start
 */
function getNextPlayer() {
	const _game = get(game);
	const currentPlayer = _game.turn;
	let nextPlayer = currentPlayer;

	/**
	 * Move sequentially to next player
	 * Loops from end to start
	 * Skips players without dice
	 */
	do {
		if (nextPlayer === _game.players.length - 1) {
			nextPlayer = 0;
		} else {
			nextPlayer++;
		}
	} while (_game.players[nextPlayer].dice.length === 0);

	return nextPlayer;
}

export default getNextPlayer;
