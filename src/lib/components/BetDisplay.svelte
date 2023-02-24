<script>
	/**
	 * Displays the current bet amount and face
	 * Used by `PlayerDashboard` and `RoundEnd`
	 */

	import { game } from '$lib/stores/game';
</script>

<span class="font-bold">
	{$game.bet.amount}
	{$game.bet.face}
	{$game.bet.amount !== 1 ? 's' : ''}
</span>
