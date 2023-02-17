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
    over: true,
	state: 'passPhone', // playerDash, passPhone, called, spotted
	bet: {
		amount: 1,
		face: 1,
        player: 0,
	}
};

export const game = localStore('game', JSON.parse(JSON.stringify(defaultGame)));

export function resetGame() {
	game.set(defaultGame);
}