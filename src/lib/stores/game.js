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
    bet: {
        amount: 1,
        face: 2,
    }
};

export const game = localStore('game', JSON.parse(JSON.stringify(defaultGame)));

export function resetGame() {
	game.set(defaultGame);
}
