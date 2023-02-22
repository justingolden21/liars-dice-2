import { get } from 'svelte/store';
import { game } from '$lib/stores/game';

function getNextPlayer() {
	const _game = get(game);
	const currentPlayer = _game.turn;
	let nextPlayer = currentPlayer;
	// move sequentially to next player, looping from end to start, skipping players without dice
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
