import { get } from 'svelte/store';
import { game } from '$lib/stores/game';

/**
 * Returns the total number of dice in the game
 */
function getNumTotalDice() {
	const players = get(game).players;
	let num = 0;
	for (let i = 0; i < players.length; i++) {
		num += players[i].dice.length;
	}
	return num;
}

export default getNumTotalDice;
