/**
 * Store file for the game state
 */

import localStore from '$lib/util/localStore';

const defaultGame = {
	players: [
		{
			name: '',
			dice: []
		},
		{
			name: '',
			dice: []
		}
	],
	numDice: 5,
	turn: 0,
	state: 'gameOver', // 'gameOver', 'playerTurn', 'passPhone', 'called', or 'spotted'
	bet: {
		amount: 1,
		face: 1, // `bet.face` is 1 so we have an invalid bet that cannot be called or spotted
		player: 0
	}
};

export const game = localStore('game', JSON.parse(JSON.stringify(defaultGame)));

export function resetGame() {
	game.set(JSON.parse(JSON.stringify(defaultGame)));
}
